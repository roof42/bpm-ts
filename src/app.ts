import express from "express";
import bodyParser from "body-parser";
import { WithdrawalRequest } from "./models/WithdrawalRequest";
import { Command } from "./models/Command";
import { BPM } from "./controllers/Bpm";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/shiftState", (req, res) => {
    const { request, command } = req.body;

    try {
        const withdrawalRequest = new WithdrawalRequest();
        withdrawalRequest.state = request.state;

        const bpm = new BPM();
        const updatedRequest = bpm.shiftState(withdrawalRequest, command);

        res.json(updatedRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
