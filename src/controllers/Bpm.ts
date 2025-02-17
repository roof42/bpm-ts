import { WithdrawalRequest, WithdrawalState, IWithdrawalRequest } from "../models/WithdrawalRequest";
import { Command } from "../models/Command";
import { ExternalApiService } from "../services/ExternalApiService";
import mongoose from 'mongoose';

export class BPM {
    private apiService: ExternalApiService;

    constructor() {
        this.apiService = new ExternalApiService();
    }

    async shiftState(id: string | null, command: Command): Promise<IWithdrawalRequest> {
        let request: IWithdrawalRequest | null = null;

        if (command === Command.StartTransaction) {
            const newRequest = new WithdrawalRequest();
            newRequest.state = WithdrawalState.TransactionStarted; // Set state to TransactionStarted
            await newRequest.save();
            console.log("State set to TransactionStarted and saved to MongoDB");
            return newRequest;
        }

        if (!id) {
            throw new Error("WithdrawalRequest ID is required for this command");
        }

        request = await WithdrawalRequest.findById(id);

        if (!request) {
            throw new Error("WithdrawalRequest not found");
        }

        switch (command) {
            case Command.VerifyStaffPolicy:
                if (request.state === WithdrawalState.TransactionStarted) {
                    await this.apiService.callVerifyStaffPolicyApi({ request });
                    request.state = WithdrawalState.StaffPolicyVerified;
                    console.log("State shifted to StaffPolicyVerified");
                } else {
                    throw new Error("Invalid command for the current state");
                }
                break;
            case Command.VerifyTransaction:
                if (request.state === WithdrawalState.StaffPolicyVerified) {
                    await this.apiService.callVerifyTransactionApi({ request });
                    request.state = WithdrawalState.TransactionVerified;
                    console.log("State shifted to TransactionVerified");
                } else {
                    throw new Error("Invalid command for the current state");
                }
                break;
            case Command.VerifyDopa:
                if (request.state === WithdrawalState.TransactionVerified) {
                    await this.apiService.callVerifyDopaApi({ request });
                    request.state = WithdrawalState.DopaVerified;
                    console.log("State shifted to DopaVerified");
                } else {
                    throw new Error("Invalid command for the current state");
                }
                break;
            case Command.RecognizeFace:
                if (request.state === WithdrawalState.DopaVerified) {
                    await this.apiService.callRecognizeFaceApi({ request });
                    request.state = WithdrawalState.FaceRecognized;
                    console.log("State shifted to FaceRecognized");
                } else {
                    throw new Error("Invalid command for the current state");
                }
                break;
            case Command.CompleteTransaction:
                if (request.state === WithdrawalState.FaceRecognized) {
                    await this.apiService.callCompleteTransactionApi({ request });
                    request.state = WithdrawalState.TransactionCompleted;
                    console.log("State shifted to TransactionCompleted");
                } else {
                    throw new Error("Invalid command for the current state");
                }
                break;
            default:
                throw new Error("Unknown command");
        }

        await request.save();  // Save the updated state to MongoDB

        return request;
    }
}
