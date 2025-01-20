import express from "express";
import AuthController from "../controllers/authcontroller.js";
import BlogController from "../controllers/blogcontroller.js";
import CategoryController from "../controllers/catagorycontroller.js";
import multer from "multer";
import checkIsUserAuthenticated from "../middlewares/authMiddleWare.js";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `public/upload`);
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

const router = express.Router();

// User Authentication Routes
router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);
router.post("/user/verify-otp", AuthController.verifyOtp);

// Blog Routes
router.get("/get/allblogs", checkIsUserAuthenticated, BlogController.getAllBlogs);
router.post("/add/blog", upload.single("thumbnail"), checkIsUserAuthenticated, BlogController.addNewBlog);
router.get("/get/blog/:id", checkIsUserAuthenticated, BlogController.getSingleBlog);

// Category Routes
router.get("/get/catagories", checkIsUserAuthenticated, CategoryController.getAllCategories);
router.post("/add/catagory", checkIsUserAuthenticated, CategoryController.addNewCategory);

export default router;
