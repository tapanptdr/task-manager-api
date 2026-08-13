const express = require("express");
const router = express.Router();
const { registerUser, loginUser, refreshAccessToken } = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/login", loginUser);

// router.get("/test", (req, res) => {
//     res.json({ message: "Working" });
// });
router.post("/refresh", refreshAccessToken)

module.exports = router;