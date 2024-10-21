import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface PostData {
  id: number;
  title: string;
  context: string;
  post_date: string;
}

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get post ID from the URL
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/posts/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: PostData = await response.json();
        console.log(data); // Log the post data
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500">{post.post_date}</p>
      <p className="text-gray-700 mt-4">{post.context}</p>
    </div>
  );
};

export default PostPage;
