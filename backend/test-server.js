import cors from "cors";
import express from "express";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ message: "Test server is working!" });
});

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
}); 