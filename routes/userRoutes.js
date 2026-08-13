const express = require("express");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

router.get("/error-test", protect, (req, res, next) => {

    const error = new Error("This is a test error");

    next(error);

});
module.exports = router;