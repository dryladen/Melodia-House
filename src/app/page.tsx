import HeroSection from "@/components/sections/hero-section";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center ">
      <div className="flex-1 w-full flex flex-col gap-16 items-center">
        <nav className="w-full flex items-center justify-center border-b border-b-foreground/10 h-16 px-16">
          <div className="w-full flex justify-between items-center p-3 text-sm">
            <div className="flex gap-5 items-center text-2xl font-bold">
              <Link href={"/"}>Melodia House</Link>
            </div>
          </div>
          <div className="flex justify-between items-center w-full text-muted-foreground">
            <ul className="flex gap-5 items-center text-sm ">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
            <div className="flex items-center gap-5">
              <ThemeSwitcher />
              <Link href="/auth/login">
                <Button>Login</Button>
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex flex-col gap-20 w-full p-5 grow px-16">
          <HeroSection />
        </div>
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-4">
          <p>
            Build With{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Next Js & Directus
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
