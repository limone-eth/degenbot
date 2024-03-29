import {BigNumber, ethers} from "ethers";

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export enum TransactionUrlWebsite {
  ETHERSCAN = "ETHERSCAN",
  ZAPPER = "ZAPPER",
  TX_FRAME = "TX_FRAME",
  ONCEUPON = "ONCEUPON",
}

export enum Network {
  ETHEREUM = "ethereum",
  BASE = "base",
}

export const getTransactionUrl = (
  txHash: string,
  type = TransactionUrlWebsite.ETHERSCAN,
  network: Network = Network.ETHEREUM
) => {
  switch (type) {
    case TransactionUrlWebsite.ETHERSCAN:
      return `${
        network === Network.ETHEREUM
          ? "https://etherscan.io"
          : "https://basescan.org"
      }/tx/${txHash}`;
    case TransactionUrlWebsite.ZAPPER:
      return `https://zapper.xyz/event/${network}/${txHash}`;
    case TransactionUrlWebsite.TX_FRAME:
      return `https://tx-frame.vercel.app/chains/${network}/transactions/${txHash}`;
    case TransactionUrlWebsite.ONCEUPON:
      return `https://www.onceupon.gg/${txHash}`;
    default:
      return `${
        network === Network.ETHEREUM
          ? "https://etherscan.io"
          : "https://basescan.org"
      }/tx/${txHash}`;
  }
};

export const formatBigNumber = (value: BigNumber, decimals = 18) => {
  return ethers.utils
    .formatUnits(value, decimals)
    .replace(/(\.\d{0,4})\d*$/, "$1");
};
