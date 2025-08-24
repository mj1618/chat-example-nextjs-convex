import { Loader2 } from "lucide-react";

export const FullPageLoader = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
};
