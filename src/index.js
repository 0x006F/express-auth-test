const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.get("/token", (req, res) => {
  const payload = { name: "test" };
  const token = jwt.sign(payload, "somesecret", { expiresIn: 60 });
  res.status(200).json({ token });
});
app.use((req, res, next) => {
  const token = req.headers["x-csrf-token"];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "where is the token bro?" });
  }
  try {
    const valid = jwt.verify(token, "somesecret");
    console.log(valid);
    next();
  } catch (error) {
    return res.status(401).json({ message: "not authenticated" });
  }
});

app.get("/verify", (req, res) => {
  res.status(200).json({ message: "succes", payload: req.payload });
});

app.listen(1234, () => {
  console.log("Started");
});
