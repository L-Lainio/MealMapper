const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
// Import just the router express
// Import the index.js from 'api' folder

// When a request is made to the /api route, it will be directed to the index.js in the 'api' folder.

module.exports = router;
