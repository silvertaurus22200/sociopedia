import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import multer from "multer";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import { createPost } from "./controllers/post.js";
import { verifyToken } from "./middleware/auth.js";
import {users, posts} from "./data/index.js";
import User from "./models/User.js";
import Post from "./models/Post.js";

// CONFIGURATIONS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}))
app.use(cors());
app.use("/assets",express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
            cb(null, "public/assets");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({storage});

// ROUTES WITH FILTES

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);


// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    console.log(PORT)

    // Data insertion
    // User.insertMany(users);
    // Post.insertMany(posts);
})
.catch((error) => {
    console.log(`${error} did not connect`);
  });
