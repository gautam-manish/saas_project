import { Router } from "express";
import InstituteController from "../../controller/institute/institute.controller";
import Middleware from "../../middleware/middleware";


const router:Router = Router();

router.route("/").post(Middleware.isLoggedIn, InstituteController.createInstitutes)


export default router;

