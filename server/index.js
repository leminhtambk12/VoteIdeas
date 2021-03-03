const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
//Using MiddleWare
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

//Routes
app.use("/api", require("./routes"));
//PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));