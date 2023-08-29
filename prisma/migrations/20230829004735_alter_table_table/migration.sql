/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `table` DROP FOREIGN KEY `Table_orderId_fkey`;

-- AlterTable
ALTER TABLE `table` ADD COLUMN `number` INTEGER NOT NULL,
    MODIFY `orderId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Table_number_key` ON `Table`(`number`);

-- AddForeignKey
ALTER TABLE `Table` ADD CONSTRAINT `Table_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
