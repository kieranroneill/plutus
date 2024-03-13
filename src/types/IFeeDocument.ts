import { Document } from 'mongoose';

interface IFeeDocument extends Document {
  blockNumber: string;
  chainId: string;
  integrator: string;
  integratorFee: string;
  lifiFee: string;
  token: string;
}

export default IFeeDocument;
