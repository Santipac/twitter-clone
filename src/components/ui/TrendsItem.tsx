import React from "react";
import NextLink from "next/link";
import { MoreHorizontal } from "lucide-react";
interface Props {
  category: string;
  title: string;
  stat: string;
}
const TrendsItem: React.FC<Props> = ({ category, title, stat }) => {
  return (
    <div className="flex flex-1 items-center gap-x-2 px-4 py-3 hover:bg-slate-200">
      <div className="flex flex-1 flex-col gap-x-2 gap-y-1">
        <p className="text-xs font-medium text-slate-700">
          {category} · Trending
        </p>
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <p className="text-xs font-medium text-slate-700">{stat} Tweets</p>
      </div>
      <div>
        <NextLink href="/">
          <MoreHorizontal className="h-4 w-4" />
        </NextLink>
      </div>
    </div>
  );
};

export default TrendsItem;
