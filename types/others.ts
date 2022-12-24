type Trending = {
  heading: string | null;
  description: string | null;
  img: string | null;
  tags: string[] | null;
};

type Follow = {
  tag: string | null;
  username: string | null;
  userImg: string | null;
};

export { Trending, Follow };
