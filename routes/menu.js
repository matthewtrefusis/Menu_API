const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menuItem");

router.use((req, res, next) => {
  if (MenuItem.db.readyState !== 1) {
    return res
      .status(503)
      .json({ message: "Database not connected. Please try again shortly." });
  }
  next();
});

// Getting all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Getting one menu item
router.get("/:id", getMenuItem, (req, res) => {
  res.json(res.menuItem);
});
// Creating a menu item
router.post("/", async (req, res) => {
  const menuItem = new MenuItem({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
  });
  try {
    const newMenuItem = await menuItem.save();
    res.status(201).json(newMenuItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating a menu item
router.patch("/:id", getMenuItem, async (req, res) => {
  if (req.body.name != null) {
    res.menuItem.name = req.body.name;
  }
  if (req.body.description != null) {
    res.menuItem.description = req.body.description;
  }
  if (req.body.price != null) {
    res.menuItem.price = req.body.price;
  }
  if (req.body.category != null) {
    res.menuItem.category = req.body.category;
  }
  if (req.body.imageUrl != null) {
    res.menuItem.imageUrl = req.body.imageUrl;
  }
  try {
    const updatedMenuItem = await res.menuItem.save();
    res.json(updatedMenuItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Deleting a menu item
router.delete("/:id", getMenuItem, async (req, res) => {
  try {
    await res.menuItem.deleteOne();
    res.json({ message: "Deleted menu item" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

async function getMenuItem(req, res, next) {
  let menuItem;
  if (!MenuItem.db.base.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid menu item id" });
  }

  try {
    menuItem = await MenuItem.findById(req.params.id);
    if (menuItem == null) {
      return res.status(404).json({ message: "Cannot find menu item" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.menuItem = menuItem;
  next();
}
module.exports = router;
