import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

//componets path
import BlogPage from "./routes/BlogPage";
import PostPage from "./components/PostPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/posts/:id" element={<PostPage />} />
      </Routes>
    </Router>
  );
}
export default App;
