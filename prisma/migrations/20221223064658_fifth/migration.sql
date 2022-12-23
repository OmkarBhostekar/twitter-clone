/*
  Warnings:

  - You are about to drop the `HashTagsOnTweet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HashTagsOnTweet" DROP CONSTRAINT "HashTagsOnTweet_hashtagId_fkey";

-- DropForeignKey
ALTER TABLE "HashTagsOnTweet" DROP CONSTRAINT "HashTagsOnTweet_tweetId_fkey";

-- DropTable
DROP TABLE "HashTagsOnTweet";

-- CreateTable
CREATE TABLE "_HashtagToTweet" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HashtagToTweet_AB_unique" ON "_HashtagToTweet"("A", "B");

-- CreateIndex
CREATE INDEX "_HashtagToTweet_B_index" ON "_HashtagToTweet"("B");

-- AddForeignKey
ALTER TABLE "_HashtagToTweet" ADD CONSTRAINT "_HashtagToTweet_A_fkey" FOREIGN KEY ("A") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToTweet" ADD CONSTRAINT "_HashtagToTweet_B_fkey" FOREIGN KEY ("B") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
