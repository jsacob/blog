import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles

interface PostData {
  id: number;
  title: string;
  context: string;
  post_date: string;
}

const PostDisplay: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800, 
    });

    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: PostData[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mainPar text-center text-2xl m-52"></div>
      <div className="container text-center mx-auto p- grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {posts.map((post) => (
          <div
            className="w-full p-5 rounded-lg"
            key={post.id}
            data-aos="fade-down"
            data-aos-duration="1500" 
          >
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-500">{post.post_date}</p>
            {/* Conditional rendering for View Post link */}
            {post.context.length >= 100 && (
              <Link
                to={`/posts/${post.id}`}
                className="mt-2 mb-2 text-blue-500"
              >
                View Post
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default PostDisplay;
