export declare class MinedLiquidity {
    obligationID: string;
    balance: number;
    debt: number;
    score: number;
    constructor(obligationID: string, balance: number, debt: number, score: number);
    static fromRedisData(obligationID: string, redisData: {
        [key: string]: string;
    }): MinedLiquidity;
    toRedisData(): {
        [key: string]: string;
    };
}
