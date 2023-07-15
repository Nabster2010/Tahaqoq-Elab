import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site";
import React from "react";

const LoadingSkeleton = () => {
  return (
    <Card className="mt-4 ">
      <CardHeader className="space-y-4">
        <CardTitle>
          <Skeleton className="w-full h-14" />
        </CardTitle>
        <div className="flex flex-col-reverse gap-8 md:items-center md:justify-between md:flex-row">
          <Skeleton className="w-full h-10 md:ml-auto md:w-28" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Array.from({ length: siteConfig.pageSize }).map((_, index) => (
            <Skeleton className="w-full h-14" key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingSkeleton;
