import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

if (!globalThis.prismaGlobal) {
  globalThis.prismaGlobal = prismaClientSingleton();
}
const db = globalThis.prismaGlobal;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
}

export default db;
