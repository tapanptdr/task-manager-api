const express = require("express");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const { getAllUsers } = require("../controllers/adminController");

const router = express.Router();

router.get(
    "/users",
    protect,
    admin,
    getAllUsers
);

module.exports = router;