const express = require("express");
const router = express.Router();
const contatosServices = require("../services/contatosServices");

router.get("/", (req, res) => {
  const result = contatosServices.getAllContacts();
  res.json(result);
});

router.get("/:id", async (req, res) => {
  try {
    const result = await contatosServices.getContactById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await contatosServices.addNewContact(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const result = await contatosServices.modifyContactById(
      req.params.id,
      req.body
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await contatosServices.deletecontactById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
