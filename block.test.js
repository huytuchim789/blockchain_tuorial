const Block = require('./block')
const cryptoHash = require('./crypto-hash')
const { GENESIS_DATA, MINE_RATE } = require('./config')
describe('Block test', () => {
  const timestamp = 2000
  const lastHash = 'lasth hash'
  const hash = 'nbar hash'
  const data = ['block', 'hello']
  const nonce = 1
  const difficulty = 1
  const block = new Block({
    timestamp: timestamp,
    hash: hash,
    data: data,
    lastHash: lastHash,
    nonce,
    difficulty,
  })
  it('should create a new block', () => {
    expect(block.lastHash).toEqual(lastHash)
    expect(block.data).toEqual(data)
    expect(block.lastHash).toEqual(lastHash)
    expect(block.hash).toEqual(hash)
    expect(block.nonce).toEqual(nonce)
    expect(block.difficulty).toEqual(difficulty)
  })
  describe('genesis block', () => {
    const genesisBlock = Block.genesis()
    it('should create a new block', () => {
      expect(genesisBlock instanceof Block).toBe(true)
    })
  })
  describe('mined block', () => {
    const lastBlock = Block.genesis()
    const data = 'mined data'
    const minedBlock = Block.mineBlock({ lastBlock, data })
    it('returns a block instance', () => {
      expect(minedBlock instanceof Block).toBe(true)
    })
    it('sets the lasthash to be the hash of the last block', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash)
    })
    it('set the dataa', () => {
      expect(minedBlock.data).toEqual(data)
    })
    it('set the timestamp', () => {
      expect(minedBlock.timestamp).not.toBeUndefined()
    })
    it('creates a sha-256 based on the proper inputs', () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(
          minedBlock.lastHash,
          minedBlock.timestamp,
          minedBlock.data,
          minedBlock.difficulty,
          minedBlock.nonce
        )
      )
    })
    it('set a hash that matchees the difficulty criteria', () => {
      expect(minedBlock.hash.substring(0, minedBlock.difficulty)).toEqual(
        '0'.repeat(minedBlock.difficulty)
      )
    })
    it('adjusts the difficulty', () => {
      const poossibleResults = [
        lastBlock.difficulty + 1,
        lastBlock.difficulty - 1,
      ]
      expect(poossibleResults.includes(minedBlock.difficulty)).toBe(true)
    })
  })
  describe('adjust difficulty()', () => {
    it('raisee the difficulty for a quickly mined block', () => {
      expect(
        Block.adjustDifficulty({
          originalBlock: block,
          timestamp: block.timestamp + MINE_RATE - 100,
        })
      ).toEqual(block.difficulty + 1)
    })
    it('lower the difficulty for a slow mined block', () => {
      expect(
        Block.adjustDifficulty({
          originalBlock: block,
          timestamp: block.timestamp + MINE_RATE + 100,
        })
      ).toEqual(block.difficulty - 1)
    })
    it('has a lower limit of 1', () => {
      block.difficulty = -1
      expect(Block.adjustDifficulty({ originalBlock: block })).toEqual(1)
    })
  })
})
