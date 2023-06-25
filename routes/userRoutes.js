import { Router, json } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { userRepository } from "../repositories/userRepository.js";

const router = Router();

router.get(
  "",
  (req, res, next) => {
    try {
      res.data = userRepository.getAll();
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const data = userService.search({id: req.params.id});
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
