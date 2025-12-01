// Server-side blog fetching utility
const fallbackBlogs = [
  {
    title: "Building Privacy-First Web Applications",
    excerpt:
      "Exploring the importance of client-side processing and privacy in modern web development. Learn how to build applications that respect user data.",
    date: "Coming Soon",
    link: "https://blog.anshkumartripathi.space/",
  },
  {
    title: "Understanding Pathfinding Algorithms",
    excerpt:
      "A deep dive into various pathfinding algorithms including A*, Dijkstra's, and Jump Point Search. Visual explanations and practical implementations.",
    date: "Coming Soon",
    link: "https://blog.anshkumartripathi.space/",
  },
  {
    title: "AI/ML in Web Development",
    excerpt:
      "How machine learning and artificial intelligence are transforming web development. Real-world examples and practical applications.",
    date: "Coming Soon",
    link: "https://blog.anshkumartripathi.space/",
  },
];

export async function fetchPopularBlogs() {
  try {
    // Try common API endpoints in parallel
    const apiEndpoints = [
      "https://blog.anshkumartripathi.space/api/posts/popular",
      "https://blog.anshkumartripathi.space/api/popular",
      "https://blog.anshkumartripathi.space/api/blog/popular",
      "https://blog.anshkumartripathi.space/api/posts?popular=true",
    ];

    // Try endpoints in parallel and return first successful response
    const responses = await Promise.allSettled(
      apiEndpoints.map((endpoint) =>
        fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 3600 }, // Revalidate every hour
        })
      )
    );

    for (const result of responses) {
      if (result.status === "fulfilled" && result.value.ok) {
        const data = await result.value.json();

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

          return formattedPosts;
        }
      }
    }

    return fallbackBlogs;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return fallbackBlogs;
  }
}

