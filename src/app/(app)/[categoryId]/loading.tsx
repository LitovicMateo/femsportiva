import LogoMain from "@/components/Assets/LogoMain";
import Image from "next/image";

export default function CategoryLoading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex h-svh w-full items-center justify-center">
      <div className="h-[128px] w-[128px]">
        <LogoMain />
      </div>
    </div>
  );
}
