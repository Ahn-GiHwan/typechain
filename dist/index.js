"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = __importStar(require("crypto-js"));
var Block = /** @class */ (function () {
    function Block(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    Block.calculateBlockHash = function (index, previousHash, timestamp, data) {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    };
    Block.validataeStructure = function (aBlock) {
        return typeof aBlock.index === "number" &&
            typeof aBlock.hash === "string" &&
            typeof aBlock.previousHash === "string" &&
            typeof aBlock.data === "string" &&
            typeof aBlock.timestamp === "number";
    };
    return Block;
}());
var genesisBlock = new Block(0, "20202020202020", "", "Hello", 123456);
var blockchain = [genesisBlock];
var getBlockchain = function () { return blockchain; };
var getLatestBlock = function () { return blockchain[blockchain.length - 1]; };
console.log(getLatestBlock);
var getNewTimeStamp = function () { return Math.round(new Date().getTime() / 1000); };
var createBlock = function (data) {
    var previousBlock = getLatestBlock();
    var newIndex = previousBlock.index + 1;
    var newTimeStamp = getNewTimeStamp();
    var newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    var newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
var getHashForBlock = function (aBlock) {
    return Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
};
var isBlockValid = function (condidataBlock, previousBlock) {
    if (!Block.validataeStructure(condidataBlock))
        return false;
    else if (previousBlock.index + 1 !== condidataBlock.index)
        return false;
    else if (previousBlock.hash !== condidataBlock.previousHash)
        return false;
    else if (getHashForBlock(condidataBlock) !== condidataBlock.hash)
        return false;
    else
        return true;
};
var addBlock = function (condidataBlock) {
    if (isBlockValid(condidataBlock, getLatestBlock()))
        blockchain.push(condidataBlock);
};
createBlock("second block");
createBlock("third block");
createBlock("fourth block");
console.log(blockchain);
//# sourceMappingURL=index.js.map