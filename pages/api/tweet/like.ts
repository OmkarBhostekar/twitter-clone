import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

const likeUnlikePost = async (req: NextApiRequest, res: NextApiResponse) => {
  let { tweetId, userId } = req.body;
  tweetId = parseInt(tweetId);
  userId = parseInt(userId);
  const isLiked = await prisma.tweet.findUnique({
    where: { id: tweetId },
    select: {
      likes: {
        where: { id: userId },
        select: { id: true },
      },
    },
  });
  if (isLiked.likes.length === 0) {
    await prisma.tweet.update({
      where: { id: tweetId },
      data: {
        likes: {
          connect: { id: userId },
        },
      },
    });
  } else {
    await prisma.tweet.update({
      where: { id: tweetId },
      data: {
        likes: {
          disconnect: { id: userId },
        },
      },
    });
  }
  res.status(200).json({ message: "success" });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  switch (method) {
    case "GET":
      break;
    case "POST":
      likeUnlikePost(req, res);
      break;
    case "PATCH":
      break;
    case "DELETE":
      break;
    default:
      res.status(500).json({ message: "Method not allowed" });
      break;
  }
}
