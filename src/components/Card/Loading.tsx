import React from "react";
import Skeleton from "react-loading-skeleton";
import Typography from "../Typography";

export default function CardLoading() {
  return (
    <div className="w-[240px] p-6 bg-white rounded-lg">
      <div className="w-full aspect-square pb-3" data-testid="skeleton-image">
        <Skeleton className="w-full h-full" />
      </div>
      <Typography.Heading
        as="h2"
        level={6}
        className="font-semibold text-center"
        data-testid="skeleton-heading"
      >
        <Skeleton className="w-full h-full" />
      </Typography.Heading>
      <div className="mt-2 flex gap-x-2 justify-center">
        <div
          className="!w-[60px] flex-1 grow shrink-0"
          data-testid="skeleton-type"
        >
          <Skeleton className="w-full" />
        </div>
        <div
          className="!w-[60px] flex-1 grow shrink-0"
          data-testid="skeleton-type"
        >
          <Skeleton className="w-full" data-testid="skeleton-type" />
        </div>
      </div>
    </div>
  );
}
