export enum WithdrawalState {
    TransactionStarted,
    StaffPolicyVerified,
    TransactionVerified,
    DopaVerified,
    FaceRecognized,
    TransactionCompleted
}

export class WithdrawalRequest {
    state: WithdrawalState;

    constructor() {
        this.state = WithdrawalState.TransactionStarted;
    }
}
