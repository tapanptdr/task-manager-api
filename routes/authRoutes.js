const express = require("express");
const router = express.Router();
const { registerUser, loginUser, refreshAccessToken } = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../validators/authValidator");
const validate = require("../middleware/validationMiddleware");
const { authLimiter } = require("../middleware/rateLimitMiddleware");

router.post("/register", authLimiter, registerValidator, validate, registerUser);

router.post("/login", authLimiter, loginValidator, validate, loginUser);

// router.get("/test", (req, res) => {
//     res.json({ message: "Working" });
// });
router.post("/refresh", refreshAccessToken)



module.exports = router;