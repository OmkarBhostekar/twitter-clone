import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  const uid = parseInt(req.query.uid as string);
  const userId = parseInt(req.query.userId as string);
  console.log(uid, userId);

  const user = await prisma.user.findUnique({
    where: { id: uid },
    select: {
      id: true,
      name: true,
      username: true,
      avatar: true,
      bio: true,
      cover: true,
      verified: true,
      _count: {
        select: {
          followedBy: true,
          following: true,
          tweets: true,
        },
      },
    },
  });
  const follows = await prisma.follows.findFirst({
    where: {
      followerId: userId,
      followingId: uid,
    },
    select: {
      followerId: true,
    },
  });
  const isFollow = follows ? true : false;
  // @ts-ignore
  user.isFollowed = isFollow;
  res.status(200).json(user);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  switch (method) {
    case "GET":
      getUserById(req, res);
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
