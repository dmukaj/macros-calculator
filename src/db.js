import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        // eslint-disable-next-line no-undef
        url: process.env.DATABASE_URL,
      },
    },
  });
};

if (!globalThis.prismaGlobal) {
  globalThis.prismaGlobal = prismaClientSingleton();
}
const db = globalThis.prismaGlobal;
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
}

export default db;
