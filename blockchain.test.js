const Blockchain = require("./blockchain");
const Block = require("./block");

describe("Block chain", () => {
  const blockchain = new Blockchain();
  it("contains the blockchain", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });
  it("start with the genesis chain", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });
  it("adds a new block to the chain", () => {
    const newData = "foo bar";
    blockchain.addBlock({ data: newData });
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });
});
