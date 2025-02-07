const express = require('express');
const Routers = express.Router();
const Person = require('../Models/Person');
const mongoose = require('mongoose');


Routers.post('/Staff', async (req, res) => {
  try {
    const data = req.body
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("your data is saved");
    res.status(200).json(response);
  }
  catch (error) {
    console.log("data not saved", error);
    res.status(500).json({ error: "internal server error" }); 
  }
})

Routers.get('/Staff', async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    console.log("Error fetching data", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

Routers.get("/Staff/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const item = await Person.findById(id);
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

Routers.get("/Staff/role/:x", async (req, res) => {
  try {
    const work = req.params.x;
    if (["Chef", "Manager", "Staff"].includes(work)) {
      const response = await Person.find({ Work: work });
      console.log("Successfully fetched data");
      return res.status(200).json(response);
    } else {
      console.log("Invalid role input");
      return res.status(404).json({ error: "Invalid role input" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

Routers.put('/Staff/id/:id', async (req, res) => {
  try {
     const personId = req.params.id;
    const updatedPersonData = req.body;
    if (!mongoose.Types.ObjectId.isValid(personId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,
      runValidators: true,
    });
    if (!updatedPerson) {
      console.log("User not found");
      return res.status(404).json({ error: 'Person not found' });
    }
    console.log('Data Updated');
    return res.status(200).json({ message: "Data updated successfully", data: updatedPerson });
  } catch (error) {
    console.error("Error updating data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

Routers.delete('/Staff/id/:id', async (req, res) => {
  try {
    const personId = req.params.id; 

    if (!mongoose.Types.ObjectId.isValid(personId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      console.log("User not found");
      return res.status(404).json({ error: 'Person not found' });
    }
    console.log('Data deleted');
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = Routers;