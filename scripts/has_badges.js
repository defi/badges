const DeFiBadge = artifacts.require("DeFiBadge");

const Bluebird = require("bluebird");

module.exports = async cb => {
  const badgeContract = await DeFiBadge.deployed();
  const totalSupply = await badgeContract.totalSupply();
  console.log("Total supply", totalSupply.toNumber());
  const res = await Bluebird.map(
    Array(totalSupply.toNumber())
      .fill(null)
      .map((_, idx) => idx),
    async tokenId => {
      console.log(tokenId);
      return await badgeContract.ownerOf(tokenId);
    },
    {
      concurrency: 10
    }
  );
  console.log(res.join("\n"));
  cb();
};

process.on("unhandledRejection", err => console.error(err));
