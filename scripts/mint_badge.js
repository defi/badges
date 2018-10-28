const DeFiBadge = artifacts.require("DeFiBadge");

const BADGE_URL =
  "https://raw.githubusercontent.com/defi/badges/master/static/defi_prague.json";

module.exports = async () => {
  const badgeContract = await DeFiBadge.deployed();
  await badgeContract.mint(
    "0x63fAe14B601c83120704D37A7f78eB65057dD615",
    BADGE_URL
  );
};
