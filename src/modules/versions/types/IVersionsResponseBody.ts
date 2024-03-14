// types
import type IDatabaseConnectionResponseBody from './IDatabaseConnectionResponseBody';

interface IVersionsResponseBody {
  databases: IDatabaseConnectionResponseBody[];
  environment: string | null;
  name: string | null;
  version: string | null;
}

export default IVersionsResponseBody;
