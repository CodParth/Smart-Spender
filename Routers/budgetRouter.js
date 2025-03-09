import express from 'express';
import { createBudget, updateBudget, getBudget } from '../controllers/budgetController.js';

const router = express.Router();

// Route to create a new budget
router.post('/create', createBudget);

// Route to update an existing budget
router.put('/update', updateBudget);

// Route to get the current budget
router.get('/', getBudget);

export default router;
