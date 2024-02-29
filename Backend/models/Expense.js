import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    //What has been bought
    expenseName: {
        type: String,
        required: [true, 'Title cannot be empty']
    },
    //Is it subscription, grocery, etc.
    expenseCategory: {
        type: String,
        required: [true, 'Please select expense category']
    },
    //What payment method has been used
    paymentMethod: {
        type: String,
        required: [true, 'Please select payment method']
    },
    price: {
        type: Number,
        required: [true, 'Please enter a valid number']
    },
    count: {
        type: Number,
        required: [true, 'Please enter a valid number']
    },
    createdBy: {
        type: String,
        required: [true, 'Expense creator']
    }
}, {
    timestamps: true
});

export default mongoose.model('Expense', ExpenseSchema);