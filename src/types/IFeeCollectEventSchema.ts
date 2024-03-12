import { Document } from 'mongoose';

interface IFeeCollectEventSchema extends Document {
  integrator: string;
  integratorFee: string;
  lifiFee: string;
  token: string;
}

export default IFeeCollectEventSchema;
