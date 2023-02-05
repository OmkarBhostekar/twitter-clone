import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

const getTweetDetail = async (
  tid: string,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const userId = req.query.userId as string;
  const tweet = await prisma.tweet.findUnique({
    where: { id: tid },
    select: {
      id: true,
      content: true,
      image: true,
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
          verified: true,
        },
      },
      hashtags: {
        select: {
          id: true,
          name: true,
        },
      },
      createdAt: true,
      likes: {
        select: {
          id: true,
        },
        where: {
          id: userId,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          image: true,
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
            },
          },
          likes: {
            select: {
              id: true,
            },
            where: { id: userId },
          },
          createdAt: true,
          _count: {
            select: {
              likes: true,
            },
          },
        },
      },
      _count: {
        select: { likes: true, comments: true },
      },
    },
  });
  res.status(200).json(tweet);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tid } = req.query;
  const tweetId = tid as string;
  const method = req.method;
  switch (method) {
    case "GET":
      getTweetDetail(tweetId, req, res);
      break;
    case "POST":
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
