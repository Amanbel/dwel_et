import { Router } from "express";
import { ingestContent } from "../controllers/extension.controller";

const router = Router();

router.post("/events", ingestContent);

export default router;
