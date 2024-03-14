import type { WebSocketProvider } from 'ethers';

interface IChainWebsocketProvider {
  chainId: string;
  provider: WebSocketProvider;
}

export default IChainWebsocketProvider;
