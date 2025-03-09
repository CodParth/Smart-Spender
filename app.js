import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./DB/Database.js";
import transactionRoutes from "./Routers/Transactions.js";
import budgetRoutes from "./Routers/budgetRouter.js"; // Import budget routes
import userRoutes from "./Routers/userRouterUpdated.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler.js";
import { Server } from "socket.io";

const app = express(); // Declare app at the top
const port = 4000; // Declare port at the top

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// Database connection
connectDB();

// Routes
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/budget", budgetRoutes); // Use budget routes

app.get("/", (req, res) => {
  res.send("FinManager Server is working");
});

// Server initialization
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Socket.io setup
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("transaction", () => io.emit("refreshTransactions"));
});

// Error handling middleware
app.use(errorHandler);
