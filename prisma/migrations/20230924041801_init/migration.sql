/*
  Warnings:

  - Added the required column `group` to the `image_questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group` to the `verse_questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image_questions` ADD COLUMN `group` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `verse_questions` ADD COLUMN `group` VARCHAR(191) NOT NULL;
