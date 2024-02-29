import express from 'express';
import expenseController from '../controllers/expense.js';
import expenseValidators from '../middleware/validators/expenseValidator.js';

const router = express.Router();

router.post('/add', expenseValidators.expenseValidator ,expenseController.addExpense);

router.delete('/delete/:id', expenseController.deleteExpense);

router.put('/update/:id', expenseValidators.expenseValidator ,expenseController.updateExpense);

router.get('/all', expenseController.allExpenses);

export default router;