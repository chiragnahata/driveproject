const express= require('express');
const router = express.Router();
const Supabase=require('../config/supabase.config');
const { upload, supabase }=require('../config/multer.config');
const fileModel=require('../models/file.model');
const authMiddleware=require('../middlewares/auth');

router.get('/home', authMiddleware, async (req, res) => {
    
    const userFiles = await fileModel.find({ 
      user: req.user.userId 
    });

    console.log(userFiles);

    res.render('home',{
      files: userFiles
    });
});

router.post("/upload-file", authMiddleware, upload.single('file'), async (req, res) => {
  try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const file = req.file;
      const fileName = `uploads/${Date.now()}-${file.originalname}`;

      console.log("Uploading file:", file.originalname);
      console.log("Generated file path:", fileName);
      console.log("User ID from token:", req.user.userId);

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
          .from("drive") // Replace with your actual bucket name
          .upload(fileName, file.buffer, { contentType: file.mimetype });

      if (error) {
          console.error("Supabase Upload Error:", error.message);
          return res.status(500).json({ error: error.message });
      }

      // Generate Public URL
      const { data: publicUrlData } = supabase.storage
          .from("drive") // Replace with your actual bucket name
          .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;

      console.log("Supabase Public URL:", publicUrl);

      // Save File to Database
      const newFile = await fileModel.create({
          path: fileName,  // Store relative path, not full URL
          user: req.user.userId,
          originalname: file.originalname,
          uploadedAt: new Date()
      });

      console.log("File saved in database:", newFile);

      res.redirect("/home");
  } catch (err) {
      console.error("Upload error:", err.message);
      res.status(500).json({ error: err.message });
  }
});


router.get('/download/:path', authMiddleware, async (req, res) => {
  try {
      console.log("Download route hit!");

      const loggedInUserID = req.user.userId;
      let extractedPath = req.params.path;

      console.log("User ID:", loggedInUserID);
      console.log("Extracted Path:", extractedPath);

      // Ensure the extracted path matches how it's stored in MongoDB
      extractedPath = decodeURIComponent(extractedPath); // Decode URL-encoded path

      const file = await fileModel.findOne({
          user: loggedInUserID,
          path: extractedPath
      });

      if (!file) {
          console.error("File not found in database! Searched Path:", extractedPath);
          return res.status(404).json({ message: "File not found" });
      }

      console.log("File found in database:", file);

      // Generate signed URL from Supabase (valid for 5 minutes)
      const expiryInSeconds = 60 * 5;
      const { data, error } = await supabase.storage
          .from("drive") // Replace with your bucket name
          .createSignedUrl(file.path, expiryInSeconds);

      if (error) {
          console.error("Error generating signed URL:", error.message);
          return res.status(500).json({ error: "Failed to generate signed URL" });
      }

      console.log("Signed URL:", data.signedUrl);

      // Redirect user to signed URL for download
      res.redirect(data.signedUrl);
  } catch (err) {
      console.error("Download error:", err.message);
      res.status(500).json({ error: err.message });
  }
});






module.exports = router;
