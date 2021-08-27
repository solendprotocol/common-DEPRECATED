export class FarmScore {
  obligationID: string;
  balance: number;
  debt: number;
  score: number;

  constructor(
    obligationID: string, 
    balance: number, 
    debt: number, 
    score: number,
  ) {
    this.obligationID = obligationID;
    this.balance = balance;
    this.debt = debt;
    this.score = score;
  }

  static fromRedisData(
    obligationID: string, 
    redisData: {[key: string]: string},
  ) {
    let balance = 0;
    let debt = 0;
    let score = 0;
    if (redisData) {
      balance = Number(redisData["balance"]!);
      debt = Number(redisData["debt"]!);
      score= Number(redisData["score"]!);
    }
    return new FarmScore(obligationID, balance, debt, score);
  }

  toRedisData(): {[key: string]: string} {
    return {
      "obligationID": this.obligationID,
      "balance": this.balance.toString(),
      "debt": this.debt.toString(),
      "score": this.score.toString(),
    }
  }
}


export enum InstructionType {
  Borrow = "borrow",
  Liquidation = "liquidation",
  Repay = "repay",
  Supply = "supply",
  Withdraw = "withdraw",
}


export class TokenMovement {
  tokenMint: string;
  quantity: number;

  constructor (tokenMint: string, quantity: number) {
    this.tokenMint = tokenMint;
    this.quantity = quantity;
  }
}


export class Instruction {
  obligationID: string;
  timestamp: Date;
  transactionSignature: string;
  transactionIndex: number;
  type: InstructionType;
  movements: TokenMovement[];

  constructor(
    obligationID: string, 
    timestamp: Date, 
    signature: string, 
    transactionIndex: number, 
    type: InstructionType, 
    movements: TokenMovement[]
  ) {
    this.obligationID = obligationID;
    this.timestamp = timestamp;
    this.transactionSignature = signature;
    this.transactionIndex = transactionIndex;
    this.type = type;
    this.movements = movements;
  }

  static fromRedisData(data: string): Instruction {
    return JSON.parse(data);
  }

  toRedisData(): string {
    return JSON.stringify(this);
  }

  score(): number {
    return dateToScore(this.timestamp, this.transactionIndex);
  }
}

// NOTE: This assumes at most 1,000,000 instructions per transaction. It will not 
// necessarily break when this assumption does not hold though
export function dateToScore(d: Date, transactionIndex: number): number {
  return ((d.getTime() / 1000) * 1000000) + transactionIndex;
}