import { atom } from "recoil";
import { Follow, Trending } from "../types/others";

export const trendingState = atom({
  key: "trendingState",
  default: [] as Trending[],
});

export const followState = atom({
  key: "followState",
  default: [] as Follow[],
});
