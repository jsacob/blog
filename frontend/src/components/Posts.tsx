import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export interface PostProps {
  id: number;
  title: string;
  context: string;
  post_date: string;
  isExpanded: boolean; // Prop to control expansion
  onToggle: () => void; // Toggle function prop
}

const ReadMoreDD: React.FC<{
  context: string;
  isExpanded: boolean;
  onToggle: () => void; // Toggle function
}> = ({ context, isExpanded, onToggle }) => {
  return (
    <div>
      <p className="text-gray-600 mb-4 text-center">
        {isExpanded ? context : `${context.substring(0, 100)}...`}
      </p>
      <button onClick={onToggle} className="bg-black text-white p-2 rounded">
        {isExpanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
};

const Post: React.FC<PostProps> = ({
  id,
  title,
  context,
  post_date,
  isExpanded,
  onToggle,
}) => {
  useEffect(() => {
    AOS.init({
      duration: 1800,
      once: true,
    });
  }, []);

  // Define a threshold for the content length
  const contentThreshold = 100; // You can adjust this value as needed

  return (
    <div
      className="postContainer h-fit max-w-xl min-w-xl p-6 rounded-xl shadow-lg bg-white text-white mb-6"
      key={id}
      data-aos="fade-up"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        {title}
      </h2>

      {/* Conditionally render ReadMoreDD only if context length exceeds the threshold */}
      {context.length > contentThreshold ? (
        <ReadMoreDD
          context={context}
          isExpanded={isExpanded}
          onToggle={onToggle}
        />
      ) : (
        <p className="text-gray-600 mb-4 text-center">{context}</p> // Display full content if short
      )}

      <p className="text-sm text-gray-400 text-center">
        {new Date(post_date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default Post;
