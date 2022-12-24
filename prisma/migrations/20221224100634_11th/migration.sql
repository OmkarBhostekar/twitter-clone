/*
  Warnings:

  - You are about to drop the `CommentLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_authorId_fkey";

-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_tweetId_fkey";

-- DropTable
DROP TABLE "CommentLike";

-- DropTable
DROP TABLE "Like";

-- CreateTable
CREATE TABLE "_tweetsLikedBy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_commentsLikedBy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_tweetsLikedBy_AB_unique" ON "_tweetsLikedBy"("A", "B");

-- CreateIndex
CREATE INDEX "_tweetsLikedBy_B_index" ON "_tweetsLikedBy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_commentsLikedBy_AB_unique" ON "_commentsLikedBy"("A", "B");

-- CreateIndex
CREATE INDEX "_commentsLikedBy_B_index" ON "_commentsLikedBy"("B");

-- AddForeignKey
ALTER TABLE "_tweetsLikedBy" ADD CONSTRAINT "_tweetsLikedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tweetsLikedBy" ADD CONSTRAINT "_tweetsLikedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_commentsLikedBy" ADD CONSTRAINT "_commentsLikedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_commentsLikedBy" ADD CONSTRAINT "_commentsLikedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
