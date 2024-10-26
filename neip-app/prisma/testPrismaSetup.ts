// TODO: import prisma client once created 

// Connect to db before running tests
beforeAll(async () => {
  await prisma.$connect();
});

// Disconnect from db
afterAll(async () => {
  await prisma.$disconnect();
});
