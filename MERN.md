# Mern stack notes

## Setup

In a project, there should be a seperate folder for client and server. The React app is in the client folder.

In the server folder;

    npm init -y

Add the nodemon start script in package.json, and add type: module

    {
      "name": "server",
      "version": "1.0.0",
      "description": "",
      "type": "module",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon index.js"
      },
      "keywords": [],
      "author": "",
      "license": "ISC"
    }

Install commonly used packages;

    npm install express mongoose nodemon cors dotenv

Create an index.js file;

    import express from "express";
    import connectDB from "./mongodb/connect.js";
    import * as dotenv from "dotenv";
    import cors from "cors";

    import postRoutes from "./routes/postRoutes.js";
    import dalleRoutes from "./routes/dalleRoutes.js";

    // Load environment variables from .env file, where API keys and passwords are configured
    dotenv.config();
    const port = process.env.PORT || 8080;

    // Create Express server
    const app = express();
    // Express configuration to use cors
    app.use(cors());
    // Express configuration to uparse incoming data to json
    app.use(express.json({ limit: "50mb" }));

    // Configure the api routes
    app.use("/api/posts", postRoutes);
    app.use("/api/dalle", dalleRoutes);

    app.get("/", async (req, res) => {
      res.send("Hello World!");
    });

    // Connect to MongoDB and Start the server
    (async function startServer() {
      try {
        connectDB(process.env.MONGODB_URI);
        app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
        });
      } catch (error) {
        console.log(error);
      }
    })();

Run the code: `npm start`

## Connect to MongoDB

Create a singleton connection in mongodb folder;

    import mongoose from "mongoose";

    // Provide a connection to MongoDB Atlas cluster
    const connectDB = (url) => {
      mongoose.set("strictQuery", true);
      mongoose
        .connect(url)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log(err));
    };

    export default connectDB;

Create a schema to define the shape of your data model. In mongodb/models;

    import mongoose from "mongoose";

    // Create a schema
    const PostSchema = new mongoose.Schema({
      name: { type: String, required: true },
      prompt: { type: String, required: true },
      photo: { type: String, required: true },
    });

    // Create a MongoDB model using the schema
    const Post = mongoose.model("Post", PostSchema);

    export default Post;

Define the Crud Operations for the api routes.  
In postRoutes.js;

    import express from "express";
    import * as dotenv from "dotenv";
    import { v2 as cloudinary } from "cloudinary";

    import Post from "../mongodb/models/post.js";

    dotenv.config();

    const router = express.Router();

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    router.route("/").get(async (req, res) => {
      try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    router.route("/").post(async (req, res) => {
      try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo, function (error, result) {
          if (error) {
            throw new Error(`Failed to save image`);
          }
        });
        const newPost = await Post.create({
          name,
          prompt,
          photo: photoUrl.secure_url,
        });
        res.status(201).json({ success: true, data: newPost });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });

    export default router;

In dalleRoutes.js;

    import express from "express";
    import * as dotenv from "dotenv";
    import { OpenAIApi, Configuration } from "openai";

    dotenv.config();
    const router = express.Router();

    const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);

    router.route("/").post(async (req, res) => {
      try {
        const prompt = req.body.prompt;
        const imgResponse = await openai.createImage({
          prompt: prompt,
          n: 1,
          size: "512x512",
        });
        const url = imgResponse.data.data[0].url;
        res.status(200).json({ url });
      } catch (error) {
        res
          .status(error?.response?.status)
          .send(
            `Error: ${error?.message || error?.response?.data?.error?.message}. ${
              error?.response?.data
            }`
          );
      }
    });

    export default router;
