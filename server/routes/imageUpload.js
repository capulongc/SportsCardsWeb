const express = require("express");
const router = express.Router();

const upload = require('../services/multer');

const singleUpload = upload.single('image');

router.post('/upload', upload.array('image'), function (req, res, next) {
    res.redirect("/admin.html");
    return res.json({ 'imageUrl': req.files.location });
});

module.exports = router;