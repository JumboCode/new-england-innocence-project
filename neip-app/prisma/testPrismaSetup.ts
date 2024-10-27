import prisma from '../src/backend/prisma';

// Connect to db before running tests
beforeAll(async () => {
  await prisma.$connect();
});

// Disconnect from db
afterAll(async () => {
  await prisma.$disconnect();
});
