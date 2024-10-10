import React from "react";
import Skeleton from "react-loading-skeleton";
import Typography from "../Typography";

export default function CardLoading() {
  return (
    <div className="w-full p-6 bg-white rounded-lg">
      <div className="w-full aspect-square pb-3">
        <Skeleton className="w-full h-full" />
      </div>
      <Typography.Heading
        as="h2"
        level={6}
        className="font-semibold text-center"
      >
        <Skeleton className="w-full h-full" />
      </Typography.Heading>
      <div className="mt-2 flex gap-x-2 justify-center">
        <Skeleton className="!w-[60px] flex-1 grow shrink-0" />
        <Skeleton className="!w-[60px] flex-1 grow shrink-0" />
      </div>
    </div>
  );
}
