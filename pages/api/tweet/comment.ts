import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

const addComment = async (req: NextApiRequest, res: NextApiResponse) => {
  var { tweetId, userId, content, image } = req.body;
  tweetId = tweetId as string;
  userId = userId as string;
  console.log(tweetId, userId, content, image);

  const comment = await prisma.comment.create({
    data: {
      content: content as string,
      image: image as string,
      authorId: userId,
      tweetId: tweetId,
    },
  });
  res.status(200).json(comment);
};

const getComments = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, userId } = req.query;
  const tweetId = id as string;
  const uid = userId as string;
  const comments = await prisma.comment.findMany({
    where: {
      tweetId: tweetId,
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
        },
      },
      likes: {
        select: {
          id: true,
        },
        where: { id: uid },
      },
      createdAt: true,
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
  res.status(200).json(comments);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  switch (method) {
    case "GET":
      getComments(req, res);
      break;
    case "POST":
      addComment(req, res);
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
