const express = require("express");
const property = require("../controllers/property.controller");
const { requireRoles } = require("../middlewares/auth.middleware");
const uploadProperty = require("../middlewares/uploadProperty.middleware");

const router = express.Router();

const uploadFields = uploadProperty.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "detailImages", maxCount: 10 },
]);

router.use(requireRoles("host"));

router.get("/", property.getHostProperties);
router.get("/:id", property.getHostPropertyById);
router.post("/", uploadFields, property.createHostProperty);
router.put("/:id", uploadFields, property.updateHostProperty);
router.delete("/:id", property.deleteHostProperty);

module.exports = router;
