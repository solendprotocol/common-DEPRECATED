export declare class FarmScore {
    obligationID: string;
    balance: number;
    debt: number;
    score: number;
    constructor(obligationID: string, balance: number, debt: number, score: number);
    static fromRedisData(obligationID: string, redisData: {
        [key: string]: string;
    }): FarmScore;
    toRedisData(): {
        [key: string]: string;
    };
}
export declare enum InstructionType {
    Borrow = "borrow",
    Liquidation = "liquidation",
    Repay = "repay",
    Supply = "supply",
    Withdraw = "withdraw"
}
export declare class TokenMovement {
    tokenMint: string;
    quantity: number;
    constructor(tokenMint: string, quantity: number);
}
export declare class Instruction {
    obligationID: string;
    timestamp: Date;
    transactionSignature: string;
    transactionIndex: number;
    type: InstructionType;
    movements: TokenMovement[];
    constructor(obligationID: string, timestamp: Date, signature: string, transactionIndex: number, type: InstructionType, movements: TokenMovement[]);
    static fromRedisData(data: string): Instruction;
    toRedisData(): string;
    score(): number;
}
export declare function dateToScore(d: Date, transactionIndex: number): number;
