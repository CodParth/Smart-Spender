import express from 'express';
const router = express.Router();

router.post("/add", async (req, res) => {
    const transaction = new Transaction(req.body);
    await transaction.save();
    io.emit("refreshTransactions"); // Notify clients
    res.json(transaction);
});

      
import { addTransactionController, deleteTransactionController, getAllTransactionController, updateTransactionController } from '../controllers/transactionController.js';


router.route("/addTransaction").post(addTransactionController);

router.route("/getTransaction").post(getAllTransactionController);

router.route("/deleteTransaction/:id").post(deleteTransactionController);

router.route('/updateTransaction/:id').put(updateTransactionController);

export default router;
