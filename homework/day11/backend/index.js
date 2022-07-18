import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./swagger/config.js";
import { UserController } from "./mvc/controllers/user.controller.js";
import { PhoneController } from "./mvc/controllers/phone.controller.js";
import { StarbucksController } from "./mvc/controllers/starbucks.controller.js";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(options)));
app.use(cors());
app.use(express.json());

const userController = new UserController();
app.post("/users", userController.createUser);
app.get("/users", userController.fetchUsers);

const phoneController = new PhoneController();
app.post("/tokens/phone", phoneController.createToken);
app.patch("/tokens/phone", phoneController.authToken);

const starbucksController = new StarbucksController();
app.get("/starbucks", starbucksController.fetchStarbucks);

mongoose.connect("mongodb://my-database:27017/mydocker04");

app.listen(3000, () => {
  console.log("프로그램 실행~");
});
