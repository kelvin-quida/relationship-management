/*
  Warnings:

  - You are about to drop the column `clientId` on the `Office` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Office` DROP FOREIGN KEY `Office_clientId_fkey`;

-- AlterTable
ALTER TABLE `Client` ADD COLUMN `officeId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Office` DROP COLUMN `clientId`;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_officeId_fkey` FOREIGN KEY (`officeId`) REFERENCES `Office`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
