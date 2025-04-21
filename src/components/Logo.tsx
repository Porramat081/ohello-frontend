import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Logo() {
  return (
    <div
      className={`${poppins.className} flex items-center gap-2 font-bold text-primary-foreground`}
    >
      <span className="text-white text-xl md:text-2xl">ohell</span>
      <div className="relative size-7">
        <div className="absolute w-full h-full border-[3px] border-[#0b2d6b] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]" />
        <div className="absolute w-[78%] h-[78%] border-[3px] border-[#0b2d6b] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]" />
        <div className="absolute w-[40%] h-[40%] bg-[#f2b700] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3]" />
      </div>
    </div>
  );
}
