const processFileUploads = (req, res, next) => {
  try {
    if (req.files) {
      for (const field in req.files) {
        if (req.files[field] && req.files[field][0]) {
          // Con multer-s3, .location contiene la URL pública
          req.body[field] = req.files[field][0].location;
        }
      }
    }
    next();
  } catch (error) {
    console.error("Error processing file uploads:", error);
    res.status(500).json({ error: "Error processing file uploads" });
  }
};

module.exports = processFileUploads;
