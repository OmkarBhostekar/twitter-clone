type Tweet = {
  id: number;
  content: string | null;
  image: string | null;
  author: {
    id: number;
    name: string;
    username: string;
    avatar: string;
  };
  hashtags: [
    {
      id: number;
      name: string;
    }
  ];
  likes: Object[];
  _count: {
    likes: number;
    comments: number;
  };
  comments: [Comment];
  createdAt: String;
};

// @ts-ignore
export { Tweet };
