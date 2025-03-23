import express from "express"
import { protectRoute } from "../middleware/protectRoute.js";
import { getNotifications, deleteNotifications, deleteOneNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications)
// to delete one notifications
router.delete("/:id", protectRoute, deleteOneNotifications);
router.delete("/", protectRoute, deleteNotifications)


export default router;