import { ApiProperty } from '@nestjs/swagger';

interface IProps {
  canonicalName: string;
  chainId: string;
  namespace: string;
  reference: string;
  testnet: boolean;
}

export default class GetChainsResponseBodyDTO {
  @ApiProperty({
    description: 'The canonical name for the chain.',
  })
  public readonly canonicalName: string;
  @ApiProperty({
    description:
      'The ID of the chain. This is the concatenation of the chain namespace and reference as specified in CAIP-2.',
  })
  public readonly chainId: string;
  @ApiProperty({
    description: 'The namespace covers the class of blockchain.',
  })
  public readonly namespace: string;
  @ApiProperty({
    description:
      'The reference identifies the blockchain within a given namespace.',
  })
  public readonly reference: string;
  @ApiProperty({
    description: 'Whether the chain is testnet or not.',
  })
  public readonly testnet: boolean;

  constructor({
    canonicalName,
    chainId,
    namespace,
    reference,
    testnet,
  }: IProps) {
    this.canonicalName = canonicalName;
    this.chainId = chainId;
    this.namespace = namespace;
    this.reference = reference;
    this.testnet = testnet;
  }
}
