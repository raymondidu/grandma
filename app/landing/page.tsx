"use client"
import React, { JSX, useState } from "react";
import { Avatar, AvatarImage } from "../component/ui/avatar";
import { Button } from "../component/ui/button";
import { Card, CardContent } from "../component/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../component/overlay/dialog";
import { Overlay } from "../component/overlay/overlay";
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
      title: "Paste Your Text.",
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
                Paste your chat. Get grandma&apos;s savage wisdom. Share the
                meme.
              </p>
            </div>

            <Card className="translate-y-[-1rem] animate-fade-in  [--animation-delay:400ms] w-full max-w-2xl bg-white rounded-3xl border-t-2 border-b-2 border-[#ffe7de]">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:gap-6">
                  {/* User Message */}
                  <div className="flex items-end justify-end gap-2 sm:gap-3">
                    <div className="flex max-w-[85%] sm:max-w-[75%] items-center justify-center gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#ffe7dd] rounded-[24px_24px_0px_24px]">
                      <div className="text-[#1e1e1e] text-sm sm:text-base leading-relaxed">
                        Hey Grandma the new guy I just started seeing sent me
                        the message below
                        <br />
                        <br />
                        &quot;Let&apos;s just go with the flow, no need to
                        define things yet.&quot;
                      </div>
                    </div>

                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 flex-shrink-0">
                      <AvatarImage
                        src="https://c.animaapp.com/mfhdz9vioM8Kab/img/frame-6-1.svg"
                        className="bg-cover bg-center"
                      />
                    </Avatar>
                  </div>

                  {/* Grandma Response */}
                  <div className="flex items-end gap-2 sm:gap-3">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 flex-shrink-0">
                      <AvatarImage src="https://c.animaapp.com/mfhdz9vioM8Kab/img/frame-6.svg" />
                    </Avatar>

                    <div className="flex flex-col max-w-[85%] sm:max-w-[75%] bg-[#8156d9] rounded-[24px_24px_24px_0px] overflow-hidden">
                      <div className="flex items-center justify-center gap-2.5 px-3 py-1 sm:px-4 sm:py-1 bg-[#502c9a]">
                        <div className="text-white text-xs sm:text-sm font-medium">
                          👵 Grandma&apos;s Verdict:
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5">
                        <div className="text-white text-sm sm:text-base leading-relaxed">
                          Sweetheart, flows are for rivers — not relationships.
                          Dump him 🚩.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                  <div className="font-normal text-[#1e1e1e] text-lg sm:text-xl text-center">
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
            Join Grandma - the AI that protects your heart and rewards your
            choices.
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