import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;
  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  static validataeStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.data === "string" &&
    typeof aBlock.timestamp === "number";
}

const genesisBlock: Block = new Block(0, "20202020202020", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

console.log(getLatestBlock);

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimeStamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimeStamp
  );

  addBlock(newBlock);

  return newBlock;
};

const getHashForBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  );

const isBlockValid = (condidataBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validataeStructure(condidataBlock)) return false;
  else if (previousBlock.index + 1 !== condidataBlock.index) return false;
  else if (previousBlock.hash !== condidataBlock.previousHash) return false;
  else if (getHashForBlock(condidataBlock) !== condidataBlock.hash)
    return false;
  else return true;
};

const addBlock = (condidataBlock: Block): void => {
  if (isBlockValid(condidataBlock, getLatestBlock()))
    blockchain.push(condidataBlock);
};

createBlock("second block");
createBlock("third block");
createBlock("fourth block");

console.log(blockchain);
