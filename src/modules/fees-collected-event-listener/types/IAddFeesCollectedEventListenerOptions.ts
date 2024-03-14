import { WebSocketProvider } from 'ethers';

// types
import type { IChainConfig } from '@app/types';

interface IAddFeesCollectedEventListenerOptions {
  chainConfig: IChainConfig;
  provider: WebSocketProvider;
}

export default IAddFeesCollectedEventListenerOptions;
