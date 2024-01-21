import { PrismaClient } from "@prisma/client";
import { Client } from '@planetscale/database'
import { PrismaPlanetScale } from '@prisma/adapter-planetscale'
import { fetch as undiciFetch } from 'undici'

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

const connectionString = `${process.env.DATABASE_URL}`
const client = new Client({ url: connectionString, fetch: undiciFetch })
const adapter = new PrismaPlanetScale(client)

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({ adapter });
  }
  prisma = global.prisma;
}

export default prisma;
