/*
  Warnings:

  - You are about to drop the column `onwerId` on the `Library` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Library` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Library` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Library" DROP CONSTRAINT "Library_onwerId_fkey";

-- DropIndex
DROP INDEX "Library_onwerId_key";

-- AlterTable
ALTER TABLE "Library" DROP COLUMN "onwerId",
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Library_ownerId_key" ON "Library"("ownerId");

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
