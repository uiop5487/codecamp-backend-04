import { Starbucks } from "../models/stabucks.model.js";

export class StarbucksController {
  fetchStarbucks = async (req, res) => {
    const result = await Starbucks.find();
    console.log(result);
    res.send(result);
  };
}
