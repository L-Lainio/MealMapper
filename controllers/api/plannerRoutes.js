const express = require('express');
const router = express.Router();
const MealPlan = require('../../models/MealPlan');




// Save meal plan
router.post('/save', async (req, res) => {
  try {
    const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } = req.body;
    const mealPlan = await MealPlan.create({ sunday, monday, tuesday, wednesday, thursday, friday, saturday });
    res.json({ success: true, mealPlan });
  } catch (error) {
    console.error('Error saving meal plan:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;