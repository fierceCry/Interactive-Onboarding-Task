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
        nickname,
      },
    });
  };

  token = async ({ userId, refreshToken }) => {
    const existingToken = await this.prisma.refreshToken.findFirst({
      where: {
        userId: userId,
      },
    });
  
    if (existingToken) {
      return this.prisma.refreshToken.update({
        where: {
          id: existingToken.id,
        },
        data: {
          refreshToken,
        },
      });
    } else {
      return this.prisma.refreshToken.create({
        data: {
          userId,
          refreshToken,
        },
      });
    }
  };
}
