// TODO: import prisma client once created 

describe("Prisma CRUD operations", () => {
  test("Create and retrieve a user", async () => {
    const user = await prisma.exoneree.create({
      data: { 
        // TODO
      },
    });
    expect(user).toBeDefined();

    const foundUser = await prisma.exoneree.findUnique({
        // TODO
    });
    expect(foundUser).toMatchObject(user);

    await prisma.exoneree.delete({ where: { id: user.id } });
  });
});
