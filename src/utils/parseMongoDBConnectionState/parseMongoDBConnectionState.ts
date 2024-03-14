import { ConnectionStates } from 'mongoose';

// enums
import { ConnectionStatusEnum } from '@app/enums';

export default function parseMongoDBConnectionState(
  state: ConnectionStates
): ConnectionStatusEnum {
  switch (state) {
    case ConnectionStates.connected:
      return ConnectionStatusEnum.Connected;
    case ConnectionStates.connecting:
      return ConnectionStatusEnum.Connecting;
    case ConnectionStates.disconnected:
      return ConnectionStatusEnum.Disconnected;
    case ConnectionStates.disconnecting:
      return ConnectionStatusEnum.Disconnecting;
    case ConnectionStates.uninitialized:
    default:
      return ConnectionStatusEnum.Uninitialized;
  }
}
