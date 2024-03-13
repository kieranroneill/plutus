import type { Contract, EventLog, Log } from 'ethers';

interface IOptions {
  contract: Contract;
  event: EventLog | Log;
}

export default IOptions;
