import { Seeder } from 'mongo-seeding';
import { resolve } from 'node:path';

export default async function seedDatabase(): Promise<void> {
  const seeder: Seeder = new Seeder({
    database: {
      host: '127.0.0.1',
      name: process.env.MONGODB_NAME,
      password: process.env.MONGODB_PASSWORD,
      port: parseInt(process.env.MONGODB_PORT),
      username: process.env.MONGODB_USERNAME,
    },
    mongoClientOptions: {
      authSource: 'admin',
    },
    dropDatabase: true,
  });

  try {
    await seeder.import(
      seeder.readCollectionsFromPath(resolve(process.cwd(), 'test', 'seeds'))
    );
  } catch (error) {
    console.error(error);

    throw error;
  }
}
