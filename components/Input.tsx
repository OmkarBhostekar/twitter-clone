import {
  CalendarDaysIcon,
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { storage } from "../firebase";
import { useSession } from "next-auth/react";

type Props = {};

const Input = (props: Props) => {
  const [input, setInput] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const filePickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const addImageToPost = (e: any) => {
    console.log(e);
    const reader = new FileReader();
    console.log(e.target.files.length);

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const onEmojiSelect = (e: any) => {
    setInput(input + e.native.toString());
  };

  const onTweetClickListener = async () => {
    if (loading) return;
    setLoading(true);
    // create tweet

    const tweetId = "1";
    const imageRef = ref(storage, `tweets/${tweetId}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url")
        .then(async (snapshot) => {
          const downloadURL = await getDownloadURL(snapshot.ref);
          console.log(downloadURL);
          // update tweet with image
        })
        .catch((error) => {
          console.log(error);
        });
    } else console.log("no image");

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  };

  const { data: session } = useSession();

  return (
    <div
      className={`border-b border-gray-700 p-3 flex gap-x-3 overflow-y-auto sm:scrollbar-hide xl:scrollbar-hide`}
    >
      <img
        src={session?.user?.image}
        alt=""
        className="h-10 w-10 rounded-full xl:mr-2.5"
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e: any) => setInput(e.target.value)}
            id=""
            rows={2}
            placeholder="What's happening"
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-700 tracking-wide w-full min-h-[50px]"
          />
        </div>
        {selectedFile && (
          <div className="relative">
            <div
              className="absulate w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex justify-center items-center top-1 right-1 cursor-pointer "
              onClick={(e: any) => setSelectedFile(null)}
            >
              <XMarkIcon className="h-5 text-white" />
            </div>
            <img
              src={selectedFile}
              alt=""
              className="rounded-2xl max-h-48 object-contain w-full text-start"
            />
          </div>
        )}
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div
              className="icon"
              onClick={() => {
                if (filePickerRef.current !== null)
                  filePickerRef!.current!.click();
              }}
            >
              <PhotoIcon className="h-[22px] text-green-600" />
              <input
                hidden
                type="file"
                onChange={addImageToPost}
                ref={filePickerRef}
              />
            </div>
            <div className="icon">
              <ChartBarIcon className="text-green-600 h-[22px]" />
            </div>
            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
              <FaceSmileIcon className="text-green-600 h-[22px]" />
            </div>
            <div className="icon">
              <CalendarIcon className="text-green-600 h-[22px]" />
            </div>
            {showEmojis && (
              <div className="absolute max-w-[320px] mt-[465px] ml-[-40px] rounded-md">
                <Picker
                  data={data}
                  onEmojiSelect={onEmojiSelect}
                  theme="dark"
                />
              </div>
            )}
          </div>
          <button
            className="bg-green-600 rounded-full px-6 py-2 text-md font-bold hover:bg-green-700 disabled:opacity-50 disabled:bg-green-900 cursor-pointer"
            disabled={input.length === 0}
            onClick={onTweetClickListener}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
