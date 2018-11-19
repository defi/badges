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
  console.log("Minting...");
  const filtered = attendees.filter(
    x => !attendeesDone.includes(x.toLowerCase())
  );
  console.log(
    `Found ${attendeesDone.length} attendees, so only ${
      filtered.length
    } (previous ${attendees.length})`
  );
  await Bluebird.map(
    filtered,
    async attendee => {
      // retries
      for (let i = 0; i < 3; i++) {
        try {
          console.log(`Mint for ${attendee}`);
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
