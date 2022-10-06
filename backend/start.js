const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

dotenv.config();

const PORT = process.env.PORT || 3000;
const config = require("./config");
if (
  config.credentials.client_id == null ||
  config.credentials.client_secret == null
) {
  console.error(
    "Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables."
  );
  return;
}
let app = express();

app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

// Connect to database

mongoose.connect(process.env.MONGO_DB, () => {
  console.log("Connected to database!");
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "50mb" }));
app.use("/api/forge/oauth", require("./routes/oauth"));
app.use("/api/forge/oss", require("./routes/oss"));
app.use("/api/forge/modelderivative", require("./routes/modelderivative"));
app.use("/api/forge/auth", require("./routes/auth"));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode).json(err);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
