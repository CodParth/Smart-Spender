import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls


const BudgetReminder = () => {
  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [message, setMessage] = useState('');

  const [budgetData, setBudgetData] = useState({ amount: 0, spent: 0 });
  
  
  const [budgetData, setBudgetData] = useState({ amount: 0, spent: 0 });
  
  const handleBudgetChange = (e) => {
    setBudgetData({ ...budgetData, amount: e.target.value });
  };

  const handleSpentChange = (e) => {
    setBudgetData({ ...budgetData, spent: e.target.value });
  };

  const saveBudget = async () => {
    try {
      await axios.post('/api/budget/create', { amount: budgetData.amount });
      alert('Budget saved successfully!');
    } catch (error) {
      console.error('Error saving budget:', error);
    }
  };

  const checkBudget = async () => {
    try {
      const response = await axios.get('/api/budget');
      const currentBudget = response.data; // Assuming it returns the current budget
      const remaining = currentBudget.amount - budgetData.spent;
      if (remaining < 0) {
        setMessage('You have exceeded your budget!');
      } else {
        setMessage(`You have $${remaining} remaining in your budget.`);
      }
    } catch (error) {
      console.error('Error retrieving budget:', error);
    }
  };

    setBudgetData({ ...budgetData, amount: e.target.value });
  };

  const handleSpentChange = (e) => {
    setBudgetData({ ...budgetData, spent: e.target.value });
  };

  const saveBudget = async () => {
    try {
      await axios.post('/api/budget/create', { amount: budgetData.amount });
      alert('Budget saved successfully!');
    } catch (error) {
      console.error('Error saving budget:', error);
    }
  };

  const checkBudget = async () => {
    try {
      const response = await axios.get('/api/budget');
      const currentBudget = response.data; // Assuming it returns the current budget
      const remaining = currentBudget.amount - budgetData.spent;
      if (remaining < 0) {
        setMessage('You have exceeded your budget!');
      } else {
        setMessage(`You have $${remaining} remaining in your budget.`);
      }
    } catch (error) {
      console.error('Error retrieving budget:', error);
    }
  };

    setBudgetData({ ...budgetData, amount: e.target.value });
  };

  const handleSpentChange = (e) => {
    setBudgetData({ ...budgetData, spent: e.target.value });
  };

  const saveBudget = async () => {
    try {
      await axios.post('/api/budget/create', { amount: budgetData.amount });
      alert('Budget saved successfully!');
    } catch (error) {
      console.error('Error saving budget:', error);
    }
  };

 

    setBudget(e.target.value);
  };

  const handleSpentChange = (e) => {
    setSpent(e.target.value);
  };

  const checkBudget = () => {
    const remaining = budget - spent;
    if (remaining < 0) {
      setMessage('You have exceeded your budget!');
    } else {
      setMessage(`You have $${remaining} remaining in your budget.`);
    }
  };

  return (
    <div className="budget-reminder">
      <h2>Budget Reminder</h2>
      <input
        type="number"
        placeholder="Enter your budget"
        value={budget}
        onChange={handleBudgetChange}
      />
      <input
        type="number"
        placeholder="Enter amount spent"
        value={spent}
        onChange={handleSpentChange}
      />
      <button onClick={saveBudget}>Save Budget</button>
      <button onClick={checkBudget}>Check Remaining Budget</button>

      <p>{message}</p>
    </div>
  );
};

export default BudgetReminder;
