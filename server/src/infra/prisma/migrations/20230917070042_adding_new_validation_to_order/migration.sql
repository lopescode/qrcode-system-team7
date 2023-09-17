/*
  Warnings:

  - You are about to drop the column `total` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `total`,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;
