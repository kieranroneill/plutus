// enums
import { ConnectionStatusEnum } from '@app/enums';

interface IDatabaseConnectionResponseBody {
  status: ConnectionStatusEnum;
  type: string;
  version: string;
}

export default IDatabaseConnectionResponseBody;
