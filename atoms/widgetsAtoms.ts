import { atom } from "recoil";
import { Follow, Trending } from "../types/others";

export const trendingState = atom({
  key: "trendingState",
  default: [
    {
      heading: "T20 World Cup 2021 · LIVE",
      description:
        "NZvAUS: New Zealand and Australia clash in the T20 World Cup final",
      img: "https://rb.gy/d9yjtu",
      tags: ["#T20WorldCupFinal, ", "Kane Williamson"],
    },
    {
      heading: "Trending in United Arab Emirates",
      description: "#earthquake",
      img: "https://rb.gy/jvuy4v",
      tags: ["#DubaiAirshow, ", "#gessdubai"],
    },
    {
      heading: "Trending in Digital Creators",
      description: "tubbo and quackity",
      img: "",
      tags: ["QUACKITY AND TUBBO,"],
    },
  ] as Trending[],
});

export const followState = atom({
  key: "followState",
  default: [
    {
      userImg: "https://rb.gy/urakiy",
      username: "SpaceX",
      tag: "@SpaceX",
    },
    {
      userImg: "https://rb.gy/aluxgh",
      username: "Elon Musk",
      tag: "@elonmusk",
    },
    {
      userImg: "https://rb.gy/zyvazm",
      username: "Tesla",
      tag: "@Tesla",
    },
  ] as Follow[],
});
