import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const getAllBlogs = async(req,res,next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (error) {
        console.log(error);
    }
    if(!blogs) {
        return res.status(400).json({message: "No Blogs found!.."});
    } else {
        return res.status(200).json({blogs});
    }
};

export const addBlog = async (req,res,next) => {
    const {title, description, image, user} = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        console.log(error);
    }
    if (!existingUser) {
        res.status(400).json({message: "Unable to find the user with this id.."})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
        return res.status(201).json({blog});
    } catch (error) {
        console.log(console.log(error));
    }
};

export const updateBlog = async (req,res,next) => {
    const blogId = req.params.id;
    const {title, description} = req.body;
    let updatedBlog;
    try {
        updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    } catch (error) {
        console.log(error);
    }
    if(updatedBlog) return res.status(200).json({updatedBlog});
    return res.status(500).json({message: "Unable to update blog.."})
};

export const getBlogById = async (req,res,next) => {
    const blogId = req.params.id;
    let existingBlog;
    try {
        existingBlog = await Blog.findById(blogId);
        if(existingBlog) return res.status(200).json({existingBlog})
        return res.status(400).json({message: "No blog found!!"})
    } catch (error) {
        console.log(error);
    }
};

export const deleteBlog = async (req,res,next) => {
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(blogId);
        if(blog) return res.status(200).json({message: "Blog deleted successfully!!"})
        return res.status(500).json({message: "Unable to delete blog"});
    } catch (error) {
        console.log(error);
    }
};
