/* eslint-disable no-undef */
const ArtistryNFT = artifacts.require('ArtistryNFT')

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts()

  await deployer.deploy(ArtistryNFT, 'Timeles NFTs', 'TNT', 10, accounts[1])
}
