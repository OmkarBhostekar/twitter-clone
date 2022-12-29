import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

async function getAllHashTags(req: NextApiRequest, res: NextApiResponse) {
  const hashtags = await prisma.hashtag.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          tweets: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  hashtags.sort((a, b) => b._count.tweets - a._count.tweets);
  res.status(200).json(hashtags);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  switch (method) {
    case "GET":
      getAllHashTags(req, res);
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
