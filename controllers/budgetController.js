import Budget from '../models/Budget.js'; // Assuming a Budget model exists

// Create a new budget
export const createBudget = async (req, res) => {
  try {
    const { amount } = req.body;
    const newBudget = new Budget({ amount });
    await newBudget.save();
    res.status(201).json({ message: 'Budget created successfully', budget: newBudget });
  } catch (error) {
    res.status(500).json({ message: 'Error creating budget', error });
  }
};

// Update an existing budget
export const updateBudget = async (req, res) => {
  try {
    const { id, amount } = req.body;
    const updatedBudget = await Budget.findByIdAndUpdate(id, { amount }, { new: true });
    res.status(200).json({ message: 'Budget updated successfully', budget: updatedBudget });
  } catch (error) {
    res.status(500).json({ message: 'Error updating budget', error });
  }
};

// Get the current budget
export const getBudget = async (req, res) => {
  try {
    const budget = await Budget.find(); // Adjust as necessary to retrieve the correct budget
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving budget', error });
  }
};
