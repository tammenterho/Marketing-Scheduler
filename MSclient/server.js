const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(__dirname + "/dist/mmfront"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/mmfront/index.html"));
});

const port = process.env.PORT || 4200;

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
