import { Router } from "express";
import { registerUser } from "../../../controller/globals/auth/auth.controller";

const router:Router = Router();

router.route("/register").post(registerUser)

export default router;

