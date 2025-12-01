import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Try common API endpoints
    const apiEndpoints = [
      "https://blog.anshkumartripathi.space/api/posts/popular",
      "https://blog.anshkumartripathi.space/api/popular",
      "https://blog.anshkumartripathi.space/api/blog/popular",
      "https://blog.anshkumartripathi.space/api/posts?popular=true",
    ];

    for (const endpoint of apiEndpoints) {
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 3600 }, // Revalidate every hour
        });

        if (response.ok) {
          const data = await response.json();
          
          // Handle different response formats
          let posts = [];
          if (Array.isArray(data)) {
            posts = data;
          } else if (data.posts && Array.isArray(data.posts)) {
            posts = data.posts;
          } else if (data.data && Array.isArray(data.data)) {
            posts = data.data;
          }

          if (posts.length > 0) {
            const formattedPosts = posts.slice(0, 3).map((post) => {
              let link = post.link || post.url;
              
              // If no direct link but we have a slug, construct the URL with /blog/ prefix
              if (!link && post.slug) {
                link = `https://blog.anshkumartripathi.space/blog/${post.slug}`;
              } else if (!link) {
                link = `https://blog.anshkumartripathi.space/blog`;
              } else if (link && post.slug && !link.includes('/blog/')) {
                // If link exists but doesn't have /blog/, ensure it's added
                if (link.startsWith('https://blog.anshkumartripathi.space/') && !link.startsWith('https://blog.anshkumartripathi.space/blog/')) {
                  link = link.replace('https://blog.anshkumartripathi.space/', 'https://blog.anshkumartripathi.space/blog/');
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

            return NextResponse.json(formattedPosts, {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
              },
            });
          }
        }
      } catch (error) {
        // Continue to next endpoint
        continue;
      }
    }

    // If all endpoints fail, return empty array
    return NextResponse.json([], {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

