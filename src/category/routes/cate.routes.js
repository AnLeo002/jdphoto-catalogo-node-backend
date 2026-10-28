import express from "express";
import { createCategory,findCategoryByCategory,findAll } from "../controllers/cate.controller.js";
import { validateCategory } from "../../middleware/categoryValidator.js";

const categoryRouter = express.Router();

categoryRouter.post("/crear", validateCategory,createCategory);
categoryRouter.get("/buscar/categoria",validateCategory,findCategoryByCategory);
categoryRouter.get("/buscar/todos",findAll);

export default categoryRouter;
