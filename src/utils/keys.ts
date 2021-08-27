export class RedisKeys {
  minedLiquidityKey(obligationID: string): string {
    return `mined_liquidity_${obligationID}`;
  }
}
