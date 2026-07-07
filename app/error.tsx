"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 text-center flex-1">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        {error.message}
      </p>
      <Button onClick={() => reset()} className="px-8">
        Try again
      </Button>
    </div>
  );
}
