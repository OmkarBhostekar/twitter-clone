import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({log: ["query"]})

async function getTweets() {
    // const tweet = await prisma.tweet.create({
    //     data: {
    //         content: "Hello World",
    //         authorId: 1,
    //     },
    // })

    const tweets = await prisma.tweet.findMany({
        select: {
            id: true,
            content: true,
            image: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true,
                }
            },
            hashtags: {
                select: {
                    id: true,
                    name: true,
                }
            }
        },
    });
    return tweets;
}

const createTweet = async (req: NextApiRequest , res: NextApiResponse) => {
    res.status(200).json({ name: 'John Doe' })
}


export default async function handler(req: NextApiRequest , res: NextApiResponse) {
    const method = req.method
    switch (method) {
        case "GET":
            const tweets = await getTweets();
            res.status(200).json(tweets)
            break;
        case "POST":
            createTweet(req, res)
            break;
        default:
            res.status(500).json({ message: 'Method not allowed' })
            break;
    }
}