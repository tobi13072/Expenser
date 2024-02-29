import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import Expense from "../models/Expense.js";

//Adding new expense
const addExpense = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({errors: errors.array() });
    }

    console.log(req.body);
    let newExpense = new Expense();
    //Creating an object from body request
    newExpense.expenseName = req.body.expenseName;
    newExpense.expenseCategory = req.body.expenseCategory;
    newExpense.paymentMethod = req.body.paymentMethod;
    newExpense.price = req.body.price;
    newExpense.count = req.body.count;
    newExpense.createdBy = req.user.id

    try {
        await newExpense.save();
        res.status(201);
        res.send(newExpense);
    } catch (e) {
        console.log("Error occured in addExpenseFunction - error " + e);
        res.status(500);
    }
});

const deleteExpense = asyncHandler(async (req, res) => {
    Expense.findByIdAndRemove(req.params.id)
        .then((doc) => {
            res.status(200);
            res.send(doc);
        })
        .catch((err) => {
            console.log("Error during deleting data: " + err);
        });
});

const updateExpense = asyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        Expense.findByIdAndUpdate(req.params.id, req.body).then((doc) => {
            res.status(200);
            res.send(doc);
        });
    } catch (err) {
        console.log("Error during updating data: " + err);
        res.status(500);
        res.send("Internal server error");
    }
});

const allExpenses = asyncHandler(async (req, res) => {
    let userID = req.user.id;
    Expense.find({createdBy: userID})
        .then((docs) => {
            res.send(docs);
        })
        .catch((err) => {
            console.log("Error during fetching the data: " + err);
        });
});

export default { addExpense, deleteExpense, updateExpense, allExpenses };
