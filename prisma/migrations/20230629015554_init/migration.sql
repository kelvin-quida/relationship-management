/*
  Warnings:

  - Made the column `email` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Office` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Client` MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Office` MODIFY `phone` VARCHAR(191) NOT NULL;
