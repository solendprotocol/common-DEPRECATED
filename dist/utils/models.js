"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstructionScore = exports.Instruction = exports.TokenMovement = exports.InstructionType = exports.FarmScore = void 0;
class FarmScore {
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
        return new FarmScore(obligationID, balance, debt, score);
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
exports.FarmScore = FarmScore;
var InstructionType;
(function (InstructionType) {
    InstructionType["Borrow"] = "borrow";
    InstructionType["Liquidation"] = "liquidation";
    InstructionType["Repay"] = "repay";
    InstructionType["Supply"] = "supply";
    InstructionType["Withdraw"] = "withdraw";
})(InstructionType = exports.InstructionType || (exports.InstructionType = {}));
class TokenMovement {
    constructor(tokenMint, quantity) {
        this.tokenMint = tokenMint;
        this.quantity = quantity;
    }
}
exports.TokenMovement = TokenMovement;
class Instruction {
    constructor(obligationID, slot, signature, transactionIndex, type, movements) {
        this.obligationID = obligationID;
        this.slot = slot;
        this.transactionSignature = signature;
        this.transactionIndex = transactionIndex;
        this.type = type;
        this.movements = movements;
    }
    static fromRedisData(data) {
        return JSON.parse(data);
    }
    toRedisData() {
        return JSON.stringify(this);
    }
    score() {
        return getInstructionScore(this.slot, this.transactionIndex);
    }
}
exports.Instruction = Instruction;
// NOTE: This assumes at most 1,000,000 instructions per transaction. It will not 
// necessarily break when this assumption does not hold though
function getInstructionScore(s, index) {
    return (s * 1000000) + index;
}
exports.getInstructionScore = getInstructionScore;
