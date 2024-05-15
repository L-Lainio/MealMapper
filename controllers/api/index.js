const router = require("express").Router();
const userRoutes = require("./userRoutes");
const plannerRoutes = require("./plannerRoutes");

router.use("/users", userRoutes);
router.use("/planner", plannerRoutes);

module.exports = router;
// Import the routes. This is how we make our routes modular.

// When a request is made to the /users or /projects path, it will be directed to the index.js in the /users or /projects folder.
