const DeFiBadge = artifacts.require("DeFiBadge");

const BADGE_URL =
  "https://raw.githubusercontent.com/defi/badges/master/static/defi_prague.json";

const attendees = require("fs")
  .readFileSync("../attendees.txt")
  .toString()
  .split("\n");

const Bluebird = require("bluebird");

module.exports = async cb => {
  const badgeContract = await DeFiBadge.deployed();
  console.log("Minting...");
  await Bluebird.map(attendees, async attendee => {
    console.log(`Mint for ${attendee}`);
    const tx = await badgeContract.mint(attendee, BADGE_URL);
    console.log("Finished tx", tx);
  });
  cb();
};
