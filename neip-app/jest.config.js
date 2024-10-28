module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["/prisma/testPrismaSetup.ts"], 
  };
  