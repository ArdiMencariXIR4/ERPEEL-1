/*
  Warnings:

  - The values [ENDMIN,TEACHER] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `studentId` INTEGER NULL,
    MODIFY `role` ENUM('ADMIN', 'PETUGAS', 'STUDENT') NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
