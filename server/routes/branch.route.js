import express from "express";
import branchController from "../controllers/branch.controller.js";

const router = express.Router();

router.get("/", branchController.getAllBranches);
router.post("/addBranch", branchController.addBranch);

export default router;
