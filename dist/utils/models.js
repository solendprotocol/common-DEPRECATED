"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinedLiquidity = void 0;
class MinedLiquidity {
    constructor(obligationID, balance, debt, score) {
        this.obligationID = obligationID;
        this.balance = balance;
        this.debt = debt;
        this.score = score;
    }
    static fromRedisData(obligationID, redisData) {
        let balance = 0;
        let debt = 0;
        let score = 0;
        if (redisData) {
            balance = Number(redisData["balance"]);
            debt = Number(redisData["debt"]);
            score = Number(redisData["score"]);
        }
        return new MinedLiquidity(obligationID, balance, debt, score);
    }
    toRedisData() {
        return {
            "obligationID": this.obligationID,
            "balance": this.balance.toString(),
            "debt": this.debt.toString(),
            "score": this.score.toString(),
        };
    }
}
exports.MinedLiquidity = MinedLiquidity;
