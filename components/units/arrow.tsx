import Image from "next/image";
import React from "react";
import arrowImg from "../../../public/icon/arrow/Arrow 11.svg";
function ArrowSign({ title }: { title: string }) {
  return (
    <div>
      <h1 className="font-bold text-xs ">{title}</h1>
      <Image
        alt="arrow"
        src={arrowImg}
        className="rotate-180 fill-primary"
        width={30}
        height={30}
      />
    </div>
  );
}

export default ArrowSign;
