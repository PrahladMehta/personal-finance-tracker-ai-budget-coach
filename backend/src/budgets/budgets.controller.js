const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const createBudget = async (req, res) => {
  try {
    const { userId, name, budgetAmount } = req.body;
    const budgetId = uuidv4();
    const newBudget = await db.query(
      'INSERT INTO budgets (id, user_id, name, budget_amount) VALUES ($1, $2, $3, $4) RETURNING *',
      [budgetId, userId, name, budgetAmount]
    );
    res.status(201).json(newBudget.rows[0]);
  } catch (error) {
    console.error('Error creating budget:', error);
    res.status(500).json({ error: 'Failed to create budget' });
  }
};

const getBudgets = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authentication middleware adds user to req.user
    const budgets = await db.query(
      'SELECT * FROM budgets WHERE user_id = $1',
      [userId]
    );
    res.json(budgets.rows);
  } catch (error) {
    console.error('Error getting budgets:', error);
    res.status(500).json({ error: 'Failed to retrieve budgets' });
  }
};

const getBudgetById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const budget = await db.query(
      'SELECT * FROM budgets WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    if (budget.rows.length === 0) {
      return res.status(404).json({ error: 'Budget not found' });
    }
    res.json(budget.rows[0]);
  } catch (error) {
    console.error('Error getting budget by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve budget' });
  }
};

const updateBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, budgetAmount } = req.body;
    const updatedBudget = await db.query(
      'UPDATE budgets SET name = $1, budget_amount = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [name, budgetAmount, id, userId]
    );
    if (updatedBudget.rows.length === 0) {
      return res.status(404).json({ error: 'Budget not found' });
    }
    res.json(updatedBudget.rows[0]);
  } catch (error) {
    console.error('Error updating budget:', error);
    res.status(500).json({ error: 'Failed to update budget' });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const deletedBudget = await db.query(
      'DELETE FROM budgets WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );
    if (deletedBudget.rows.length === 0) {
      return res.status(404).json({ error: 'Budget not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting budget:', error);
    res.status(500).json({ error: 'Failed to delete budget' });
  }
};


module.exports = {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};