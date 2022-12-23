/*
  Warnings:

  - You are about to drop the column `tweetId` on the `Hashtag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Hashtag" DROP CONSTRAINT "Hashtag_tweetId_fkey";

-- AlterTable
ALTER TABLE "Hashtag" DROP COLUMN "tweetId";

-- CreateTable
CREATE TABLE "HashTagsOnTweet" (
    "tweetId" INTEGER NOT NULL,
    "hashtagId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HashTagsOnTweet_pkey" PRIMARY KEY ("tweetId","hashtagId")
);

-- AddForeignKey
ALTER TABLE "HashTagsOnTweet" ADD CONSTRAINT "HashTagsOnTweet_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HashTagsOnTweet" ADD CONSTRAINT "HashTagsOnTweet_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES "Hashtag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
