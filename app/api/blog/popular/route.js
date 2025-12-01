import { NextResponse } from "next/server";

// Helper function to format posts
function formatPosts(posts) {
  return posts.slice(0, 3).map((post) => {
    let link = post.link || post.url;

    // If no direct link but we have a slug, construct the URL with /blog/ prefix
    if (!link && post.slug) {
      link = `https://blog.anshkumartripathi.space/blog/${post.slug}`;
    } else if (!link) {
      link = `https://blog.anshkumartripathi.space/blog`;
    } else if (link && post.slug && !link.includes("/blog/")) {
      // If link exists but doesn't have /blog/, ensure it's added
      if (
        link.startsWith("https://blog.anshkumartripathi.space/") &&
        !link.startsWith("https://blog.anshkumartripathi.space/blog/")
      ) {
        link = link.replace(
          "https://blog.anshkumartripathi.space/",
          "https://blog.anshkumartripathi.space/blog/"
        );
      }
    }

    return {
      title: post.title || post.name || "Untitled",
      excerpt:
        post.excerpt ||
        post.description ||
        post.summary ||
        (post.content && typeof post.content === "string"
          ? post.content.substring(0, 150)
          : "") ||
        "Read more...",
      date: post.date || post.publishedAt || post.createdAt || "",
      link: link,
    };
  });
}

// Helper function to extract posts from response
function extractPosts(data) {
  if (Array.isArray(data)) {
    return data;
  } else if (data.posts && Array.isArray(data.posts)) {
    return data.posts;
  } else if (data.data && Array.isArray(data.data)) {
    return data.data;
  }
  return [];
}

export async function GET() {
  try {
    // Try common API endpoints in parallel
    const apiEndpoints = [
      "https://blog.anshkumartripathi.space/api/posts/popular",
      "https://blog.anshkumartripathi.space/api/popular",
      "https://blog.anshkumartripathi.space/api/blog/popular",
      "https://blog.anshkumartripathi.space/api/posts?popular=true",
    ];

    // Try endpoints in parallel with timeout
    const timeout = 5000; // 5 second timeout
    const fetchWithTimeout = (url) => {
      return Promise.race([
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 3600 }, // Revalidate every hour
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), timeout)
        ),
      ]);
    };

    const responses = await Promise.allSettled(
      apiEndpoints.map((endpoint) => fetchWithTimeout(endpoint))
    );

    // Find first successful response
    for (const result of responses) {
      if (result.status === "fulfilled" && result.value.ok) {
        try {
          const data = await result.value.json();
          const posts = extractPosts(data);

          if (posts.length > 0) {
            const formattedPosts = formatPosts(posts);

            return NextResponse.json(formattedPosts, {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
              },
            });
          }
        } catch (error) {
          // Continue to next response
          continue;
        }
      }
    }

    // If all endpoints fail, return empty array with caching
    return NextResponse.json([], {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}

