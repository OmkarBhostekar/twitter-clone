import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

async function getTweetsByHashtag(req: NextApiRequest, res: NextApiResponse) {
  const userId = parseInt(req.query.userId as string);
  const hashtag = req.query.hashtag as string;
  const tweets = await prisma.tweet.findMany({
    where: {
      hashtags: {
        some: {
          name: hashtag,
        },
      },
    },
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
      _count: {
        select: { likes: true, comments: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(200).json(tweets);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  switch (method) {
    case "GET":
      getTweetsByHashtag(req, res);
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
