import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Trending as TrendingType } from "../types/others";

type Props = {
  result: TrendingType;
};

function Trending(props: Props) {
  const { result } = props;
  return (
    <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
      <div className="space-y-0.5">
        <p className="text-[#6e767d] text-xs font-medium">{result.heading}</p>
        <h6 className="font-bold max-w-[250px] text-sm">
          {result.description}
        </h6>
        <p className="text-[#6e767d] text-xs font-medium max-w-[250px]">
          Trending with{" "}
          {result.tags &&
            result.tags.map((tag, index) => (
              <span className="tag" key={index}>
                {tag}
              </span>
            ))}
        </p>
      </div>

      {result.img ? (
        <Image
          src={result.img}
          width={70}
          height={70}
          alt="Trending"
          objectFit="cover"
          className="rounded-2xl"
        />
      ) : (
        <div className="icon group">
          <EllipsisHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-green-500" />
        </div>
      )}
    </div>
  );
}

export default Trending;
