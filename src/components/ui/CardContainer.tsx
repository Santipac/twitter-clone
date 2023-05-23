import React from "react";
import NextLink from "next/link";
interface Props {
  title: string;
  href: string;
  children: JSX.Element | JSX.Element[];
}

const CardContainer: React.FC<Props> = ({ title, href, children }) => (
  <div className="mb-3 rounded-xl bg-slate-50">
    <div className="px-4 py-4">
      <h2 className="text-xl font-bold leading-none">{title}</h2>
    </div>
    {children}
    <div className="px-4 py-4">
      <NextLink className="text-sm font-medium" href={href}>
        Show more
      </NextLink>
    </div>
  </div>
);

export default CardContainer;
