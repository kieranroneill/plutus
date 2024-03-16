import { prop, defaultClasses, modelOptions } from '@typegoose/typegoose';

const { TimeStamps } = defaultClasses;

@modelOptions({
  options: {
    customName: 'fee',
  },
})
export default class FeeSchema extends TimeStamps {
  @prop({
    index: true,
    required: true,
  })
  public blockNumber!: string;

  @prop({
    index: true,
    required: true,
  })
  public chainId!: string;

  @prop({
    required: true,
  })
  public integrator!: string;

  @prop({
    required: true,
  })
  public integratorFee!: string;

  @prop({
    required: true,
  })
  public lifiFee!: string;

  @prop({
    required: true,
  })
  public token!: string;
}
