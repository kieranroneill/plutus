import { prop } from '@typegoose/typegoose';

export default class FeeCollectEventSchema {
  @prop({ required: true })
  public integrator!: string;

  @prop({ required: true })
  public integratorFee!: string;

  @prop({ required: true })
  public lifiFee!: string;

  @prop({ required: true })
  public token!: string;
}
