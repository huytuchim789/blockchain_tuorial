const Blockchain = require('./blockchain')
const Block = require('./block')

describe('Block chain', () => {
  let blockchain
  beforeEach(() => {
    blockchain = new Blockchain()
  })
  it('contains the blockchain', () => {
    expect(blockchain.chain instanceof Array).toBe(true)
  })
  it('start with the genesis chain', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis())
  })
  it('adds a new block to the chain', () => {
    const newData = 'foo bar'
    blockchain.addBlock({ data: newData })
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData)
  })
  describe('isValidChain', () => {
    beforeEach(() => {
      blockchain.addBlock({ data: 'Bears' })
      blockchain.addBlock({ data: 'Beats' })
      blockchain.addBlock({ data: 'Battlestar' })
    })
    describe('when the chain doest not start with the genesis block', () => {
      it('returns false', () => {
        blockchain.chain[0] = { data: 'fake genesis' }
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
      })
    })
    describe('when the chain start with the genesis block and has multiple blocks', () => {
      describe('and a lastHash reference has changed', () => {
        it('returns false', () => {
          blockchain.chain[2].lastHash = 'brokent-lasthash'
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
        })
      })
      describe('and the chain contains a block with an invalid field', () => {
        it('returns false', () => {
          blockchain.chain[2].data = 'brokent-data'
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
        })
      })
      describe('and the chain does not contain any invalid blocks', () => {
        it('returns true', () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true)
        })
      })
    })
  })
  describe('replaceChain()', () => {
    describe('when the new chain is not longer', () => {
      it('does not replace the chain', () => {})
    })
    describe('when the chain is longer', () => {
      describe('when the chain is invalid', () => {
        it('does not replace the chain', () => {})
      })
    })
    describe('and the chain is valid', () => {
      it('replaces the chain', () => {})
    })
  })
})
