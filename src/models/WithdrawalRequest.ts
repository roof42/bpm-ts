import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export enum WithdrawalState {
    TransactionStarted,
    StaffPolicyVerified,
    TransactionVerified,
    DopaVerified,
    FaceRecognized,
    TransactionCompleted
}

export interface IWithdrawalRequest extends Document {
    id: string;
    state: WithdrawalState;
}

const WithdrawalRequestSchema: Schema = new Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    state: {
        type: String,
        enum: WithdrawalState,
        default: WithdrawalState.TransactionStarted,
    },
});

export const WithdrawalRequest = mongoose.model<IWithdrawalRequest>('WithdrawalRequest', WithdrawalRequestSchema);

