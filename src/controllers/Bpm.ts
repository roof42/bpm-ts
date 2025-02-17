import { WithdrawalRequest, WithdrawalState } from "../models/WithdrawalRequest";
import { Command } from "../models/Command";

export class BPM {
    shiftState(request: WithdrawalRequest, command: Command): WithdrawalRequest {
        switch (command) {
            case Command.StartTransaction:
                request.state = WithdrawalState.TransactionStarted;
                console.log("State set to TransactionStarted");
                break;
            case Command.VerifyStaffPolicy:
                if (request.state === WithdrawalState.TransactionStarted) {
                    request.state = WithdrawalState.StaffPolicyVerified;
                    console.log("State shifted to StaffPolicyVerified");
                } else {
                    throw new Error("Invalid command for the current state");
                }
                break;
            case Command.VerifyTransaction:
                if (request.state === WithdrawalState.StaffPolicyVerified) {
                    request.state = WithdrawalState.TransactionVerified;
                    console.log("State shifted to TransactionVerified");
                } else {
                    throw new Error("Invalid command for the current state");
                }
                break;
            case Command.VerifyDopa:
                if (request.state === WithdrawalState.TransactionVerified) {
                    request.state = WithdrawalState.DopaVerified;
                    console.log("State shifted to DopaVerified");
                } else {
                    throw new Error("Invalid command for the current state");
                }
                break;
            case Command.RecognizeFace:
                if (request.state === WithdrawalState.DopaVerified) {
                    request.state = WithdrawalState.FaceRecognized;
                    console.log("State shifted to FaceRecognized");
                } else {
                    throw new Error("Invalid command for the current state");
                }
                break;
            case Command.CompleteTransaction:
                if (request.state === WithdrawalState.FaceRecognized) {
                    request.state = WithdrawalState.TransactionCompleted;
                    console.log("State shifted to TransactionCompleted");
                } else {
                    throw new Error("Invalid command for the current state");
                }
                break;
            default:
                throw new Error("Unknown command");
        }

        return request;
    }
}
