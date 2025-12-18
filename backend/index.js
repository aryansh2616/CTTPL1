import express from "express";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes.js";
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: ["http://localhost:5173", "https://choudharytours.in"],
}));

app.use(express.json());

app.get("/", (_, res) => res.send("✅ Server is running"));

app.use("/", emailRoutes);

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
