export default function parseVersion(version: string): string[] {
  const sanitizedVersion: string = version.replace(/[^\d.]/g, '');

  return sanitizedVersion.split('.');
}
