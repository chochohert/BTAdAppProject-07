export const NODE_URL =
  process.env.APTOS_NODE_URL || "https://fullnode.devnet.aptoslabs.com";
export const FAUCET_URL =
  process.env.APTOS_FAUCET_URL || "https://faucet.devnet.aptoslabs.com";
//<:!:section_1

export const aptosCoinStore =
  "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>";


export const getRandomColor = () => {
  return "#" + Math.floor(Math.random() * 0xfff).toString(16);
}
