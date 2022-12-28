import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

const getTweets = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = parseInt(req.query.userId as string);
  const tweets = await prisma.tweet.findMany({
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
};

const getUserTweets = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = parseInt(req.query.userId as string);
  const uid = parseInt(req.query.uid as string);
  const tweets = await prisma.tweet.findMany({
    where: {
      authorId: uid,
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
};

async function getTweetsByHashtag(hashtag: string) {
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
          // email: true,
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
    },
  });
  return tweets;
}

const createTweet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { content, image, userId } = req.body;
  console.log(content, image, userId);
  const hashtags = content.match(/#[\w]+/g);
  console.log(hashtags);
  const tweet = await prisma.tweet.create({
    data: {
      content: content,
      image: image,
      authorId: userId,
    },
  });
  if (hashtags) {
    for (const hashtag of hashtags) {
      const hashtagName = hashtag.slice(1).toLowerCase();
      const hashtagExists = await prisma.hashtag.findUnique({
        where: {
          name: hashtagName,
        },
      });
      if (hashtagExists) {
        await prisma.tweet.update({
          where: {
            id: tweet.id,
          },
          data: {
            hashtags: {
              connect: {
                id: hashtagExists.id,
              },
            },
          },
        });
      } else {
        const newHashtag = await prisma.hashtag.create({
          data: {
            name: hashtagName,
          },
        });
        await prisma.tweet.update({
          where: {
            id: tweet.id,
          },
          data: {
            hashtags: {
              connect: {
                id: newHashtag.id,
              },
            },
          },
        });
      }
    }
  }
  res.status(200).json(tweet);
};

const updateTweet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { content, image, tweetId } = req.body;
  if (!tweetId) {
    res.status(400).json({ message: "Tweet id is required" });
  }
  const oldTweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
    },
  });
  const data = {
    content: oldTweet && oldTweet.content,
    image: oldTweet && oldTweet.image,
  };
  if (content) {
    data.content = content;
  }
  if (image) {
    data.image = image;
  }
  const tweet = await prisma.tweet.update({
    where: {
      id: tweetId,
    },
    // @ts-ignore
    data: data,
  });
  res.status(200).json(tweet);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  switch (method) {
    case "GET":
      if (req.query.uid !== undefined) {
        getUserTweets(req, res);
      } else {
        getTweets(req, res);
      }
      break;
    case "POST":
      createTweet(req, res);
      break;
    case "PATCH":
      updateTweet(req, res);
      break;
    default:
      res.status(500).json({ message: "Method not allowed" });
      break;
  }
}
