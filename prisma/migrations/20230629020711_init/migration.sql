/*
  Warnings:

  - Made the column `email` on table `Office` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Office` MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NULL;
