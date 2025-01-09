import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <div className="grid grid-cols-2 p-3">
      <div className="flex flex-col gap-4 items-start justify-center">
        <h1 className="sr-only">Melodia Studio</h1>
        <p className="text-xl font-medium">Welcome</p>
        <p className="text-3xl font-bold">Your Journey to Musical Mastery</p>
        <p className="text-sm text-muted-foreground">
          Melodia Studio is a platform that helps you to learn musical
          instruments easily and efficiently. We provide a variety of features
          that will help you to learn music in a fun way.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-72 md:w-full lg:w-48 xl:w-80">
          <Image
            src={"/brand.jpg"}
            quality={100}
            priority
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={500}
            height={300}
            alt="Foto diri"
            className="h-fit w-fit bg-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
}
