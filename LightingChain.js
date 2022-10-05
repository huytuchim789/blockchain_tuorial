const lightnignHash = (data) => {
  return data + "*";
};

class Block {
  constructor(data, hash, lastHash) {
    this.hash = hash;
    this.data = data;
    this.lastHash = lastHash;
  }
}
const fooBlock = new Block("foo-data", "foo-hash", "foo-lastHash");
class Blockchain {
  constructor() {
    const genesis = new Block(
      " genesis-data",
      "genesis-hash",
      "genesis-lastHash"
    );
    this.chain = [genesis];
  }
  addBlock(data) {
    const lastHash = this.chain[this.chain.length - 1].hash;
    const hash = lightnignHash(data + lastHash);
    const block = new Block(data, hash, lastHash);
    this.chain.push(block);
    // console.log(this.chain);
  }
}

const fooBlockChain = new Blockchain();
fooBlockChain.addBlock("data1");
fooBlockChain.addBlock("data2");
console.log(fooBlockChain);
