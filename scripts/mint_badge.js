const DeFiBadge = artifacts.require("DeFiBadge");

const BADGE_URL =
  "https://raw.githubusercontent.com/defi/badges/master/static/defi_prague.json";

const attendees = require("fs")
  .readFileSync("../attendees.txt")
  .toString()
  .split("\n");

const attendeesDone = require("fs")
  .readFileSync("../attendees_done.txt")
  .toString()
  .split("\n")
  .map(x => x.toLowerCase());

const Bluebird = require("bluebird");

module.exports = async cb => {
  const badgeContract = await DeFiBadge.deployed();

  // read from blockchain
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
  const res2 = res.map(x => x.toLowerCase());

  console.log("Minting...");
  const filtered = attendees.filter(
    x =>
      !attendeesDone.includes(x.toLowerCase()) &&
      !res2.includes(x.toLowerCase())
  );
  console.log(
    `Found ${attendeesDone.length} attendees and ${
      res2.length
    } attendees, so only ${filtered.length} (previous ${attendees.length})`
  );
  await Bluebird.map(
    filtered,
    async attendee => {
      // retries
      for (let i = 0; i < 5; i++) {
        try {
          console.log(`Mint for ${attendee} (attempt ${i})`);
          const tx = await badgeContract.mint(attendee, BADGE_URL);
          console.log("Finished tx", tx);
          return;
        } catch (e) {
          console.error(e);
        }
      }
    },
    {
      concurrency: 1
    }
  );
  cb();
};

process.on("unhandledRejection", err => console.error(err));
