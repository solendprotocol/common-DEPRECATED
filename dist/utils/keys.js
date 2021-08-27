"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisKeys = void 0;
class RedisKeys {
    farmScoreKey(obligationID) {
        return `farm_score_${obligationID}`;
    }
    instructionKey(obligationID) {
        return `instructions_${obligationID}`;
    }
}
exports.RedisKeys = RedisKeys;
