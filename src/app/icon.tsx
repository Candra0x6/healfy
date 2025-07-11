import { ImageResponse } from "next/og";
import { GiHealthDecrease } from "react-icons/gi";
export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div tw="flex h-full w-full items-center justify-center text-primary bg-white text-[24px] leading-8 text-red-500 rounded-md">
        <GiHealthDecrease />
      </div>
    ),
    {
      ...size,
    }
  );
}
