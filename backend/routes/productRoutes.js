import express from "express";
import formidable from "express-formidable";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import {
  addProduct,
  updateProductDetails,
  deleteProduct,
  getProducts,
  getProductById,
  getAllProduts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/allproducts").get(getAllProduts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/topproducts", fetchTopProducts);
router.get("/newproduct", fetchNewProducts);

router
  .route("/:id")
  .get(getProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, deleteProduct);

export default router;
