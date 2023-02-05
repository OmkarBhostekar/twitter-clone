import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

const toggleFollow = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const uid = req.query.uid as string;
    const userId = req.body.userId as string;
    const isFollow = req.body.isFollow as boolean;

    const x = await prisma.user.findFirst({
      where: { id: uid },
      select: {
        followedBy: {
          select: {
            id: true,
          },
          where: {
            id: userId,
          },
        },
      },
    });
    const follow =
      x?.followedBy.length && x.followedBy.length > 0 ? true : false;
    if (follow) {
      if (!isFollow) {
        await prisma.user.update({
          where: { id: uid },
          data: {
            followedBy: {
              delete: {
                id: userId,
              },
            },
          },
        });
      }
    } else {
      if (isFollow) {
        await prisma.user.update({
          where: { id: uid },
          data: {
            followedBy: {
              connect: {
                id: userId,
              },
            },
          },
        });
      }
    }
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
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
