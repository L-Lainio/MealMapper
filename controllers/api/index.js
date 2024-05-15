
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const plannerRoutes = require("./plannerRoutes");

router.use("/users", userRoutes);
router.use("/planner", plannerRoutes);

module.exports = router;
