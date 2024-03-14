import type { JsonRpcProvider, WebSocketProvider } from 'ethers';

interface IOptions {
  contractAddress: string;
  provider: JsonRpcProvider | WebSocketProvider;
}

export default IOptions;
