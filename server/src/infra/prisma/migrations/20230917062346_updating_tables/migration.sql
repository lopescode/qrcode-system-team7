/*
  Warnings:

  - You are about to drop the column `orderId` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `finishedAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `orderitem` table. All the data in the column will be lost.
  - Added the required column `name` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderStatusId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_statusId_fkey`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `orderId`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `finishedAt`,
    DROP COLUMN `statusId`,
    ADD COLUMN `customerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `orderitem` DROP COLUMN `quantity`,
    ADD COLUMN `orderStatusId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderStatusId_fkey` FOREIGN KEY (`orderStatusId`) REFERENCES `OrderStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
