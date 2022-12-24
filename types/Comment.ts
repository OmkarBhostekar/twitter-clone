type Comment = {
  id: number;
  content: string;
  image: string | null;
  author: {
    id: number;
    name: string;
    username: string;
    avatar: string;
  };
  likes: Object[];
  _count: {
    likes: number;
  };
  createdAt: String;
};

export { Comment };
