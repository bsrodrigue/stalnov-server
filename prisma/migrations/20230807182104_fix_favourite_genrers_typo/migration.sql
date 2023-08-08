/*
  Warnings:

  - You are about to drop the column `favouriteGenrers` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "favouriteGenrers",
ADD COLUMN     "favouriteGenres" "NovelGenre"[];
