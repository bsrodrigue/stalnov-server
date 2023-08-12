/*
  Warnings:

  - Added the required column `isMature` to the `Novel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Novel" ADD COLUMN     "isMature" BOOLEAN NOT NULL;
