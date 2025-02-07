const express = require('express');
const Router = express.Router();
const Menu = require('../Models/Schema');
const mongoose = require('mongoose');


Router.post('/Menu', async(req, res) => {
  try{
      const data = req.body
      const newMenu = new Menu(data);

      const response = await newMenu.save();
      console.log("your data is saved");
      res.status(200).json(response);
  }

  catch(error){
      console.log("data not saved",error);
      res.status(500).json({error : "internal server error"});
  }
})

Router.get('/Menu', async (req, res) => {
  try {
      const menus = await Menu.find();
      res.status(200).json(menus);
  } catch (error) {
      console.log("Error fetching data", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

Router.get("/Menu/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const item = await Menu.findById(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    console.log("Successfully fetched data");
    return res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


Router.get('/Menu/role/:x', async (req, res) => {
  try {
    const work = req.params.x;

    if (['sweet','delicious','salty','tasty'].includes(work)) {
      const response = await Menu.find({ Taste: work });
      res.status(200).json(response);
      console.log("Successfully Fetched Data");
    } else {
      res.status(404).json({ error: "Invalid input" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = Router;