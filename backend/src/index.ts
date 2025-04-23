import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes/index";

const PORT = process.env.PORT || 7000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  return res.send("Welcome home. ");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server smelling from Port: ${PORT}`);
});
