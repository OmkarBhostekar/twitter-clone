import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

const toggleFollow = async (req: NextApiRequest, res: NextApiResponse) => {
  const uid = parseInt(req.query.uid as string);
  const userId = parseInt(req.body.userId as string);
  const isFollow = req.body.isFollow as boolean;

  const follow = await prisma.follows.findFirst({
    where: {
      followerId: userId,
      followingId: uid,
    },
  });
  if (follow) {
    if (!isFollow) {
      await prisma.follows.deleteMany({
        where: {
          followerId: userId,
          followingId: uid,
        },
      });
    }
  } else {
    if (isFollow) {
      await prisma.follows.create({
        data: {
          followerId: userId,
          followingId: uid,
        },
      });
    }
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
      toggleFollow(req, res);
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
