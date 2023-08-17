import Item from "../models/Item.js";

// CREATE
export const createItem = async (req, res) => {
  try {
    const { name, price } = req.body.itemData;
    console.log( req.body.itemData);
    const newItem = new Item({ name, price });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
};

// READ
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
