import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler"; 
import routes from "./routes";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", routes);


// Your routes go here
// app.use("/api/users", userRoutes);
// app.use("/api/boards", boardRoutes);

app.use(errorHandler as unknown as express.ErrorRequestHandler);

export default app;