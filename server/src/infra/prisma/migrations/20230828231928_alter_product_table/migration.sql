/*
  Warnings:

  - You are about to drop the column `photo` on the `product` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` RENAME COLUMN `photo` TO `imageUrl`;
