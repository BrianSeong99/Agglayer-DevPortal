"use client";
import { usePathname } from "next/navigation";

const DOCK_HEIGHT = 80; // px, keep in sync with layout

export default function WindowArea({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <div
      className="relative z-10 flex justify-center items-center w-full p-[5px]"
      style={{ height: `calc(100vh - ${DOCK_HEIGHT}px)` }}
    >
      <div className="w-full h-full border border-gray-700 rounded-2xl bg-black/30 backdrop-blur-xs flex items-center justify-center">
        <main className="w-full h-full flex items-center justify-center">
          {children}
        </main>
      </div>
    </div>
  );
} 