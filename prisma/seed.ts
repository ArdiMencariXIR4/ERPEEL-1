import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminPass = await bcrypt.hash('admin123', 10);
  const teacherPass = await bcrypt.hash('teacher123', 10);

  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: adminPass,
      role: UserRole.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { username: 'teacher' },
    update: {},
    create: {
      username: 'teacher',
      password: teacherPass,
      role: UserRole.PETUGAS,
    },
  });

  console.log('Users seeded!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());