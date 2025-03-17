require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const landRoutes = require("./routes/land");
const { create } = require("ipfs-http-client");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  serverApi: {
    version: "1", // Matches ServerApiVersion.v1
    strict: true,
    deprecationErrors: true,
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/land", landRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));