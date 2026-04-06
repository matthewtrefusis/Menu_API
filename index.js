const express = require("express");
const app = express();
const Port = 8080;

app.use(express.json());

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});

app.get("/tshirt", (req, res) => {
  res.status(200).send({
    tshirt: "👕",
    size: "L",
  });
});

app.post("/tshirt/:id", (req, res) => {
  const { id } = req.params;
  const { logo } = req.body;

  if (!logo) {
    res.status(418).send({
      error: "No logo provided",
    });
  }

  res.send({
    tshirt: `👕 with your ${logo} and ID of ${id}`,
  });
});
