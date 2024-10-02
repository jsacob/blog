import React, { useEffect, useState } from "react";
import Post from "./Posts";

interface PostData {
  id: number;
  title: string;
  context: string;
  post_date: string;
}

const PostDisplay: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

  useEffect(() => {
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

  const handleToggle = (id: number) => {
    setExpandedPostId((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mainPar text-center text-2xl m-20"></div>
      <div className="container mx-auto p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {posts.map((post) => (
          <div className="w-full p-2" key={post.id}>
            <Post
              id={post.id}
              title={post.title}
              context={post.context}
              post_date={post.post_date}
              isExpanded={expandedPostId === post.id}
              onToggle={() => handleToggle(post.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PostDisplay;
