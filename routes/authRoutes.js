import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { userService } from "../services/userService.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      const data = userService.search(req.body);
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
