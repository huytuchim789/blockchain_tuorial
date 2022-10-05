const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");
class Block {
  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.hash = hash;
    this.data = data;
    this.lastHash = lastHash;
  }
  static genesis() {
    return new this(GENESIS_DATA);
  }
  static mineBlock({ lastBlock, data }) {
    const lastHash = lastBlock.hash;
    const timestamp = new Date();
    return new this({
      timestamp,
      lastHash,
      data,
      hash: cryptoHash(timestamp, lastHash, data),
    });
  }
}
module.exports = Block;
