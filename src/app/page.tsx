import Image from "next/image";
import AuthImage from "@public/Abstract Curves and Colors.jpeg"
import Logo from "@/components/Logo";
import AuthForm from "@/components/authentication/AuthForm";

export default function Home() {
  return (
    <main className="h-screen grid grid-cols-2 relative">
      <div className="relative w-full flex flex-col text-white p-10">
        <Image src={AuthImage} alt="login-image" fill className="h-full object-cover"/>
        <div className="relative z-20">
          <Logo/>
        </div>
        <div className="w-full h-[30%] bg-gradient-to-t from-transparent to-black/50 absolute top-0 left-0 z-10"/>
        <div className="w-full h-[30%] bg-gradient-to-b from-transparent to-black/50 absolute bottom-0 left-0 z-10"/>
        <div className="relative z-20 mt-auto">
          <blockquote>
            <p className="font-md">
              "Pictoria AI is a game changer for me. I have been able to generate high quality professional headshots within minutes. It has saved me countless hours of work and cost as well."
            </p>
          </blockquote>
          <p className="font-bold">Preet P.</p>
        </div>
      </div>
      <div className="relative w-full flex felx-col justify-center items-center p-8 h-full">
        <div>
          <AuthForm/>
        </div>
      </div>
    </main>
  );
}
