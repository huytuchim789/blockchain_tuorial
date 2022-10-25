const { GENESIS_DATA, MINE_RATE } = require('./config')
const cryptoHash = require('./crypto-hash')
class Block {
  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp
    this.hash = hash
    this.data = data
    this.lastHash = lastHash
    this.nonce = nonce
    this.difficulty = difficulty
  }
  static genesis() {
    return new this(GENESIS_DATA)
  }
  static mineBlock({ lastBlock, data }) {
    let hash, timestamp
    // const timestamp = new Date()
    let { difficulty, hash: lastHash } = lastBlock
    let nonce = 0
    do {
      nonce++
      timestamp = new Date()
      difficulty = Block.adjustDifficulty({
        originalBlock: lastBlock,
        timestamp,
      })
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty)
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))
    console.log(nonce)
    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash,
    })
  }
  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock
    if (difficulty < 1) return 1
    if (timestamp - originalBlock.timestamp > MINE_RATE) return difficulty - 1
    return difficulty + 1
  }
}
module.exports = Block
