import { getRoom,createRoom } from "../controllers/roomController.js";
import express from "express";
import requireAuth from "../middleware/requireAuth.js";
const router=express.Router();
router.post('/',requireAuth,createRoom);
router.get('/:roomId',getRoom);
export default router;