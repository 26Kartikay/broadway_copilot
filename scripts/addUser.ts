import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      whatsappId: '919650780843', 
    },
  });
  console.log('Created new user:', newUser);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });