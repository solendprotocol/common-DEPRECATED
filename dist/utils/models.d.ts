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
