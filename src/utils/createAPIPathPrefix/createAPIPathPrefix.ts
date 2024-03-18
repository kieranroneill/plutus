// enums
import { APIPathEnum } from '@app/enums';

/**
 * Convenience function to get the API prefix with the major version included.
 * @param {string} version - the semantic version of the application.
 * @returns {string} the API path prefix, i.e. `/api/v1`.
 */
export default function createAPIPathPrefix(version: string): string {
  const [majorVersion] = version.replace(/[^\d.]/g, '').split('.');

  return `${APIPathEnum.API}/v${majorVersion}`;
}
