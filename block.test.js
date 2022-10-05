const Block = require("./block");
const cryptoHash = require("./crypto-hash");
describe("Block test", () => {
  const timestamp = new Date();
  const lastHash = "lasth hash";
  const hash = "nbar hash";
  const data = ["block", "hello"];
  const block = new Block({
    timestamp: timestamp,
    hash: hash,
    data: data,
    lastHash: lastHash,
  });
  it("should create a new block", () => {
    expect(block.lastHash).toEqual(lastHash);
    expect(block.data).toEqual(data);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
  });
  describe("genesis block", () => {
    const genesisBlock = Block.genesis();
    it("should create a new block", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });
  });
  describe("B", () => {
    const lastBlock = Block.genesis();
    const data = "mined data";
    const minedBlock = Block.mineBlock({ lastBlock, data });
    it("returns a block instance", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });
    it("sets the lasthash to be the hash of the last block", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });
    it("set the dataa", () => {
      expect(minedBlock.data).toEqual(data);
    });
    it("set the timestamp", () => {
      expect(minedBlock.timestamp).not.toBeUndefined();
    });
    it("creates a sha-256 based on the proper inputs", () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(minedBlock.lastHash, minedBlock.timestamp, minedBlock.data)
      );
    });
  });
});
