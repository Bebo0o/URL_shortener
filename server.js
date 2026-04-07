const express = require("express");
const cors = require("cors");
const linkRoutes = require("./routes/linkRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", linkRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});