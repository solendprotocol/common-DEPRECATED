"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisKeys = void 0;
class RedisKeys {
    minedLiquidityKey(obligationID) {
        return `mined_liquidity_${obligationID}`;
    }
}
exports.RedisKeys = RedisKeys;
