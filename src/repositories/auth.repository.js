export class AuthRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findByUserName = async ({ username }) => {
    return this.prisma.user.findFirst({
      where: { username },
    });
  };

  userCreate = async ({ username, password, nickname }) => {
    return this.prisma.user.create({
      data: {
        username,
        password,
        nickname
      },
    });
  };
}
