import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminPass = await bcrypt.hash('admin123', 10);
  const teacherPass = await bcrypt.hash('teacher123', 10);

  await prisma.user.createMany({
    data: [
      {
        username: 'admin',
        password: adminPass,
        role: UserRole.ADMIN,
      },
      {
        username: 'teacher',
        password: teacherPass,
        role: UserRole.PETUGAS,
      },
    ],
  });

  console.log('Users seeded');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
