import express from "express"
import { addBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blogController.js";

const blogRoutes = express.Router();

blogRoutes.get("/", getAllBlogs);
blogRoutes.post("/add", addBlog);
blogRoutes.put("/update/:id", updateBlog);
blogRoutes.get("/:id", getBlogById);
blogRoutes.delete("/:id", deleteBlog);

export default blogRoutes;