import { useState } from "react";
import { atom } from "recoil";

export const modalState = atom({
  key: "modelState",
  default: false,
});

export const tweetIdState = atom({
  key: "tweetIdState",
  default: {},
});
