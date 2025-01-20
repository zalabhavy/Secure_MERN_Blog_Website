import express from "express";
import connectToMongo from "./config/db.js";
import authRouters from "./routes/blog.js";
import cors from "cors";
const app = express();
const PORT = 9000;

connectToMongo();

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve static files from the "public" directory

app.get("/", (req, res) => {
  res.send("API IS RUNNING!");
});

// API routes
app.use("/api/v1", authRouters);

app.listen(PORT, () => {
  console.log(`API IS RUNNING ON http://localhost:${PORT}`);
});
