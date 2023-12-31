/*
  Warnings:

  - Added the required column `indexInGame` to the `BlueprintInGame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `blueprintingame` ADD COLUMN `indexInGame` INTEGER NOT NULL;
