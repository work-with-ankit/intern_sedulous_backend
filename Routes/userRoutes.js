const express = require('express');
const router = express.Router();
const { userRegister, changePassword } = require('../controller/UserController');
const { createProfile, updateUserfield } = require('../controller/userProfileContoller');
const upload = require('../middleware/multerMiddleware');
const uploadimageMiddleware = require('../middleware/uploadFile.Middleware');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadFileController, imagedelete, imageupdate } = require('../controller/uploadController');

router.post("/register", userRegister);

router.put('/change-password/:userId', changePassword);

router.post('/upload', upload.single('file'), uploadFileController);
router.delete('/imagedelete/:id', imagedelete);
router.put('/imageupdate/:id', upload.single('file'), imageupdate);

router.post("/createProfile", upload.single("profileImage"), uploadimageMiddleware, createProfile);
router.put("/updateprofile/:id", upload.single("profileImage"), updateUserfield);

router.post("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Profile access granted",
    user: req.user,
  });
});

module.exports = router;
