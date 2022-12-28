type User = {
  id: number;
  name: string | null;
  username: string | null;
  avatar: string | null;
  bio: string | null;
  cover: string | null;
  _count: {
    followedBy: number;
    following: number;
    tweets: number;
  };
  verified: boolean;
  isFollowed: boolean;
};
export { User };
