// Modules
import { fileURLToPath } from "url";
import express from "express";
import sqlite3 from "sqlite3";
import path from "path";
import cors from "cors";

// Middleware
const app = express();
const port = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .USE
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use(cors());

// Functions
function startTime() {
  const today = new Date();
  const h = today.getHours();
  const m = today.getMinutes();
  const s = today.getSeconds();
  return [h, m, s].join(":");
}

// Database Connection
const db = new sqlite3.Database(
  "/home/jacob/Programs/blog/backend/posts.db",
  (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
    } else {
      console.log(`Connected to database successfully at: ${startTime()}`);
    }
  }
);

// Fetching all posts
app.get("/api/posts", (req, res) => {
  const query = "SELECT * FROM posts";

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch posts" });
      console.error("Error fetching posts:", err.message);
      return;
    }
    res.json(rows);
  });
});

// Fetching a single post by ID
app.get("/api/posts/:id", (req, res) => {
  const postId = req.params.id;
  const query = "SELECT * FROM posts WHERE id = ?";

  db.get(query, [postId], (err, row) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch the post" });
      console.error("Error fetching the post:", err.message);
      return;
    }
    if (!row) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(row);
  });
});

// REACT ROUTES
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Your server is currently running on http://localhost:${port}`);
});
