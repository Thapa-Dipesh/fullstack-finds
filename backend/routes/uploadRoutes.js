// ******************* This is for cloudinary upload ****************

import path from "path";
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// --- CLOUDINARY CONFIGURATION ---
// Set up Cloudinary using environment variables for security
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- MULTER CONFIGURATION ---
// Multer stores the file in memory (req.file.buffer) before it's passed to Cloudinary.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Only allow JPEG, PNG, or WebP mimetypes
  const allowedMimetypes = /image\/jpe?g|image\/png|image\/webp/;

  if (allowedMimetypes.test(file.mimetype)) {
    cb(null, true);
  } else {
    // Use a standard Error object for better handling
    cb(
      new Error(
        "File type not supported. Only JPEG, PNG, and WebP images are allowed."
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit files to 5MB
  },
});

const uploadSingleImage = upload.single("image");

// --- UPLOAD ROUTE ---
router.post("/", (req, res) => {
  uploadSingleImage(req, res, async (err) => {
    if (err) {
      // Handle Multer errors (file size limit, file type)
      return res.status(400).send({ message: err.message });
    }

    if (!req.file) {
      // No file provided, but no error occurred
      return res.status(400).send({ message: "No image file provided" });
    }

    // File is now available in req.file.buffer (in-memory)
    try {
      // Convert buffer to a Base64 string for Cloudinary upload
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

      // Upload the image data URI to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "fullstack-finds", // Optional: Organize uploads in a specific folder
      });

      // Cloudinary upload successful
      res.status(200).send({
        message: "Image uploaded successfully to Cloudinary",
        image: result.secure_url, // Send back the secure CDN URL
      });
    } catch (cloudinaryError) {
      // Handle Cloudinary upload errors
      console.error("Cloudinary Upload Error:", cloudinaryError);
      res.status(500).send({
        message: "Image upload failed during processing.",
        error: cloudinaryError.message,
      });
    }
  });
});

export default router;







// ******************* This is for local upload **********************

// import path from "path";
// import express from "express";
// import multer from "multer";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     const extname = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${extname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = path.extname(file.originalname).toLowerCase();
//   const mimetype = file.mimetype;

//   if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });
// const uploadSingleImage = upload.single("image");

// router.post("/", (req, res) => {
//   uploadSingleImage(req, res, (err) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else if (req.file) {
//       res.status(200).send({
//         message: "Image uploaded successfully",
//         image: `/${req.file.path}`,
//       });
//     } else {
//       res.status(400).send({ message: "No image file provided" });
//     }
//   });
// });

// export default router;
