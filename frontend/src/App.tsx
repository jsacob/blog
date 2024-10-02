import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

//componets path
import BlogPage from "./routes/BlogPage";
import Test from "./routes/route2test"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/testroute" element={<Test />} />
      </Routes>
    </Router>
  );
}
export default App;
