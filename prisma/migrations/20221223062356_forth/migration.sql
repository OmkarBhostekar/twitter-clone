/*
  Warnings:

  - You are about to drop the column `createdAt` on the `HashTagsOnTweet` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `HashTagsOnTweet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HashTagsOnTweet" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
