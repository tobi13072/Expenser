import { check } from "express-validator";

const expenseValidator = [
    check("expenseName")
        .exists()
        .withMessage("Request body has no TITLE parameter")
        .notEmpty()
        .withMessage("Name is required")
        .bail(),
    check("expenseCategory")
        .exists()
        .withMessage("Request body has no EXPENSE CATEGORY parameter")
        .notEmpty()
        .withMessage("Expense category is required")
        .bail(),
    check("paymentMethod")
        .exists()
        .withMessage("Request body has no PAYMENT METHOD parameter")
        .notEmpty()
        .withMessage("Payment method is required")
        .bail(),
    check("price")
        .exists()
        .withMessage("Request body has no PRICE parameter")
        .notEmpty()
        .withMessage("Price is required")
        .bail(),
    check("count")
        .exists()
        .withMessage("Request body has no COUNT parameter")
        .notEmpty()
        .withMessage("Count is required")
        .bail(),
];

export default { expenseValidator };
