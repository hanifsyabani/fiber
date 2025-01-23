"use client";

import bgfiber from "@/assets/bg.jpg";
import temp from "@/assets/temp.png";
import Image from "next/image";

export default function HeroSection({
  onButtonClick,
}: {
  onButtonClick: () => void;
}) {
  return (
    <>
      <section
        style={{ backgroundImage: `url(${bgfiber.src})` }}
        className="bg-center relative bg-cover h-[10vh] "
      >
        <div className="absolute inset-0 bg-black bg-opacity-75 "></div>
        <div className="relative flex justify-center gap-10 p-10 items-center pt-44">
          <div className="w-1/2">
            <h1 className="text-5xl font-bold text-white">
              Hitung Kebutuhan Fiber Optik Anda dengan Cepat dan Mudah!
            </h1>
            <p className="text-white text-lg my-8">
              Temukan panjang kabel fiber yang ideal, perhitungan loss, dan
              efisiensi instalasi hanya dalam hitungan detik.
            </p>
            <button className="button font-bold" onClick={onButtonClick}>
              Mulai Hitung Sekarang
            </button>
          </div>
          <div>
            <Image
              src={temp}
              alt="Dokumentasi img"
              width={500}
              height={500}
              className=""
            />
          </div>
        </div>
      </section>
    </>
  );
}
