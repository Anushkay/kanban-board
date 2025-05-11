import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler"; 
import routes from "./routes";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", routes);


app.use(errorHandler as unknown as express.ErrorRequestHandler);

export default app;