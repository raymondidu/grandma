"use client"
import React, { JSX, useState } from "react";
import { Avatar, AvatarImage } from "./component/ui/avatar";
import { Button } from "./component/ui/button";
import { Card, CardContent } from "./component/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "./component/overlay/dialog";
import { Overlay } from "./component/overlay/overlay";
import Link from "next/link";


 const LandingPage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    window.addEventListener('closeModal', handleCloseModal);
    return () => window.removeEventListener('closeModal', handleCloseModal);
  }, []);

  const howItWorksSteps = [
    {
      icon: "https://c.animaapp.com/mfhdz9vioM8Kab/img/frame-11.svg",
      title: "Ask Grandma.",
      alt: "Frame",
    },
    {
      icon: "https://c.animaapp.com/mfhdz9vioM8Kab/img/frame-11-1.svg",
      title: "Grandma Analyzes.",
      alt: "Frame",
    },
    {
      icon: "https://c.animaapp.com/mfhdz9vioM8Kab/img/frame-11-3.svg",
      title: "Get a roast or blessing meme.",
      alt: "Frame",
    },
    {
      icon: "https://c.animaapp.com/mfhdz9vioM8Kab/img/frame-11-2.svg",
      title: "Share meme with friends.",
      alt: "Frame",
    },
  ];

  return (
    <div className="bg-white min-h-screen w-full" data-model-id="1:2">
      <div className="bg-white w-full max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="w-full bg-[#fffceb] px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
          <header className="translate-y-[-1rem] animate-fade-in [--animation-delay:0ms] flex w-full items-center justify-between py-4 sm:py-6">
            <img
              className="w-12 h-14 sm:w-14 sm:h-16 lg:w-[57.66px] lg:h-[69.79px]"
              alt="Grandma logo"
              src="https://c.animaapp.com/mfhdz9vioM8Kab/img/grandma-logo-1.svg"
            />

            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-10 px-4 py-2 sm:h-12 sm:px-6 lg:px-8 lg:py-2.5 rounded-full border-2 border-[#8359db] text-[#8359db] font-semibold hover:bg-[#8359db] hover:text-white transition-colors text-sm sm:text-base"
                  >
                    <span className="hidden sm:inline">Try it Free</span>
                    <span className="sm:hidden">Try Free</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-none w-auto h-auto">
                  <Overlay />
                </DialogContent>
              </Dialog>
                 <Link href="https://forms.gle/UHcXP9UH4MkopEe76" target="_blank">
              <Button className="h-10 px-4 py-2 sm:h-12 sm:px-6 lg:px-8 lg:py-2.5 bg-[#8359db] rounded-full font-semibold hover:bg-[#6b47c4] transition-colors text-sm sm:text-base">
                <span className="hidden sm:inline">Join the Waitlist</span>
                <span className="sm:hidden">Join</span>
              </Button>
              </Link>
            </div>
          </header>

          <main className="flex flex-col w-full max-w-4xl items-center gap-6 sm:gap-8 mx-auto mt-8 sm:mt-12 lg:mt-16">
            <div className="translate-y-[-1rem] animate-fade-in  [--animation-delay:200ms] flex flex-col w-full items-center gap-4 text-center">
              <h1 className="font-semibold text-[#1e1e1e] text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Grandma Always Knows.
              </h1>

              <p className="max-w-sm sm:max-w-md lg:max-w-lg font-normal text-black text-base sm:text-lg leading-relaxed">
               Get your first Grandma Verdict in 5 seconds
              </p>
            </div>
             <h1 className="text-[12px] lg:text-xl font-bold text-[#8359db]">CA: EG4wSzwjr9ZRCcwU9ryKo6hDR76QgxYrk2SD6a78pump</h1>
            <img src="/herodesk.png" alt="hero desktop image" className="hidden lg:block"/>
            <img src="/heromobile.png" alt="hero desktop image" className="lg:hidden " />
            
           
            {/* CTA Buttons */}
            <div className="translate-y-[-1rem] animate-fade-in  [--animation-delay:600ms] flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 sm:mt-6">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 py-2.5 rounded-full border-2 border-[#8359db] text-[#8359db] font-semibold hover:bg-[#8359db] hover:text-white transition-colors"
                  >
                    Try it Free
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-none w-auto h-auto">
                  <Overlay />
                </DialogContent>
              </Dialog>
                <Link href="https://forms.gle/UHcXP9UH4MkopEe76" target="_blank">
                <Button className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 py-2.5 bg-[#8359db] rounded-full font-semibold hover:bg-[#6b47c4] transition-colors">
                Join the Waitlist
              </Button>
                
                </Link>
              
            </div>

            
          </main>
        </div>

        {/* How it Works Section */}
        <section className="translate-y-[-1rem] animate-fade-in  [--animation-delay:800ms] flex flex-col w-full items-center gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <h2 className="font-semibold text-[#1e1e1e] text-2xl sm:text-3xl lg:text-4xl text-center">
            How it Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-6xl">
            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-4"
              >
                <img
                  className="w-12 h-12 sm:w-14 sm:h-14"
                  alt={step.alt}
                  src={step.icon}
                />

                <div className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-3xl border border-[#e5d9ff]">
                  <div className="font-normal text-[#1e1e1e] text-lg lg:text-sm text-center">
                    {step.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="translate-y-[-1rem] animate-fade-in [--animation-delay:1000ms] flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
          <h2 className="font-semibold text-[#1e1e1e] text-2xl sm:text-3xl lg:text-4xl max-w-2xl">
            Want the full grandma experience?
          </h2>

          <p className="max-w-lg sm:max-w-xl font-normal text-[#716e77] text-lg sm:text-xl leading-relaxed">
            Grandma is a witty, caring AI Grandma who listens like family and advises like a counsellor.
          </p>
            <Link href="https://forms.gle/UHcXP9UH4MkopEe76" target="_blank">
          <Button className="h-12 sm:h-14 px-6 sm:px-8 py-2.5 bg-[#8359db] rounded-full font-semibold hover:bg-[#6b47c4] transition-colors">
            Join the Waitlist
          </Button>
          </Link>
        </section>

        {/* Footer */}
        <footer className="translate-y-[-1rem] animate-fade-in  [--animation-delay:1200ms] flex flex-col w-full items-center gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 bg-[#8359db]">
          <img
            className="w-12 h-14 sm:w-14 sm:h-16 lg:w-[57.66px] lg:h-[69.79px]"
            alt="Grandma logo"
            src="https://c.animaapp.com/mfhdz9vioM8Kab/img/grandma-logo-1.svg"
          />

          <div className="w-full h-px bg-white/20"></div>

          <div className="font-normal text-white text-xs sm:text-sm text-center">
            © 2025 GrandmaAI. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};
export default  LandingPage