/*
  Warnings:

  - You are about to drop the column `zipCode` on the `customeraddress` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `ingredientsonproduct` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `productsonorder` table. All the data in the column will be lost.
  - You are about to drop the `ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderpayment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postalCode` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ProductsOnOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ingredientsonproduct` DROP FOREIGN KEY `IngredientsOnProduct_ingredientId_fkey`;

-- DropForeignKey
ALTER TABLE `orderpayment` DROP FOREIGN KEY `OrderPayment_orderId_fkey`;

-- AlterTable
ALTER TABLE `customeraddress` DROP COLUMN `zipCode`,
    ADD COLUMN `postalCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    MODIFY `complement` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ingredientsonproduct` DROP COLUMN `quantity`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `order` ADD COLUMN `paymentStatus` ENUM('PENDING', 'PAID') NOT NULL,
    ADD COLUMN `price` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `productsonorder` DROP COLUMN `createdAt`,
    ADD COLUMN `quantity` INTEGER NOT NULL;

-- DropTable
DROP TABLE `ingredient`;

-- DropTable
DROP TABLE `orderpayment`;

-- CreateTable
CREATE TABLE `ProductIngredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `ProductIngredient_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `IngredientsOnProduct` ADD CONSTRAINT `IngredientsOnProduct_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `ProductIngredient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
