const { getLxLyClient, tokens, configuration, from, to } = require('./utils/utils_lxly');

const execute = async () => {
  // instantiate a lxlyclient
  const client = await getLxLyClient();

  // source NetworkId is 0, since it's Sepolia
  const sourceNetworkId = 0;

  // get token address from CLI args (e.g. `node bridge.js 0xYourTokenAddress`)
  const customTokenAddress = process.argv[2];
  const tokenAddress = customTokenAddress || tokens[sourceNetworkId].ether;

  console.log(`Bridging token ${tokenAddress} from network ${sourceNetworkId} to network ${destinationNetworkId}`);

  // get an api instance of the chosen token on Sepolia
  const token = client.erc20(tokenAddress, sourceNetworkId);

  // Set Destination Network as Cardona
  const destinationNetworkId = 1;

  // amount to bridge (in wei). For example 0.01 ETH-equivalent
  const amount = "10000000000000000";

  // call the `bridgeAsset` api
  const result = await token.bridgeAsset(amount, to, destinationNetworkId);

  // get the transaction hash
  const txHash = await result.getTransactionHash();
  console.log("txHash", txHash);

  // get the transaction receipt
  const receipt = await result.getReceipt();
  console.log("receipt", receipt);
};

execute()
  .then(() => process.exit(0))
  .catch(err => {
    console.error("err", err);
    process.exit(1);
  });