
"use client";
import React, { JSX, useState, useRef, useEffect } from "react";
import { ImageIcon, XIcon, SendHorizonalIcon } from "lucide-react";
import { Button } from "../../component/ui/button";
import { Input } from "../../component/overlay/input";
import html2canvas from 'html2canvas';

type Message = {
  id: number;
  sender: "user" | "grandma";
  text: string;
  imageUrl?: string;
};

export const Overlay2 = (): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false); // New state for footer visibility

  const shareableContentRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "" && !uploadedImage) return;

    const newUserMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
      imageUrl: uploadedImage || undefined,
    };

    const formData = new FormData();
    if (input) formData.append("message", input);
    if (uploadedImage) {
      const blob = dataURLtoBlob(uploadedImage);
      formData.append("image", blob, "uploaded_image.png");
    }

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setUploadedImage(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const grandmaResponse: Message = {
        id: Date.now() + 1,
        sender: "grandma",
        text: data.reply,
      };

      setMessages((prev) => [...prev, grandmaResponse]);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "grandma", text: "Oh dear, I couldn't connect. My internet might be on the fritz! Try again, love." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShareMeme = () => {
    if (!shareableContentRef.current) {
      console.error("Shareable content reference is not available for screenshot.");
      return;
    }
    
    // Make the footer visible before taking the screenshot
    setIsFooterVisible(true);

    // Timeout to ensure the DOM has updated
    setTimeout(() => {
      html2canvas(shareableContentRef.current!, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
      }).then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");

        if (navigator.share) {
          navigator.share({
            title: 'Grandma AI Verdict',
            text: 'Check out this savage wisdom from Grandma AI! \n\n Ask Yours on www.grandmaai.app',
            files: [new File([dataURLtoBlob(dataUrl)], "grandma-meme.png", { type: "image/png" })],
          }).then(() => console.log('Successful share'))
            .catch((error) => {
              console.error('Error sharing using Web Share API:', error);
              downloadImage(dataUrl);
            });
        } else {
          downloadImage(dataUrl);
        }
      }).catch((error) => {
        console.error("Error generating screenshot:", error);
      }).finally(() => {
        // Hide the footer again after the screenshot is taken
        setIsFooterVisible(false);
      });
    }, 100);
  };

  const dataURLtoBlob = (dataurl: string) => {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const downloadImage = (dataUrl: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "grandma-meme.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAskAnotherQuestion = () => {
    setMessages([]);
    setIsLoading(false);
  };

  const UserMessageCard = ({ text, imageUrl }: { text: string, imageUrl?: string }) => (
    <div className="flex items-end justify-end gap-2 sm:gap-3">
      <div className="flex flex-col max-w-[85%] sm:max-w-[75%] px-3 py-2 sm:px-4 sm:py-2.5 bg-[#ffe7dd] rounded-[24px_24px_0px_24px]">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded content"
            className="rounded-lg mb-2 max-w-full h-auto"
            crossOrigin="anonymous"
          />
        )}
        <div className="text-[#1e1e1e] text-sm sm:text-base leading-relaxed">
          {text}
        </div>
      </div>
      <img
        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 flex-shrink-0 rounded-full"
        src="https://c.animaapp.com/mfhdz9vioM8Kab/img/frame-6-1.svg"
        alt="User avatar"
        crossOrigin="anonymous"
      />
    </div>
  );

  const GrandmaMessageCard = ({ text }: { text: string }) => (
    <div className="flex items-end gap-2 sm:gap-3">
      <img
        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 flex-shrink-0 rounded-full"
        // src="https://c.animaapp.com/mfik764dNmxQ7u/img/frame-6.svg"
        src="/grandma.svg"
        alt="Grandma avatar"
        crossOrigin="anonymous"
      />
      <div className="flex flex-col max-w-[85%] sm:max-w-[75%] bg-[#8156d9] rounded-[24px_24px_24px_0px] overflow-hidden">
        <div className="flex items-center justify-center gap-2.5 px-3 py-1 sm:px-4 sm:py-1 bg-[#502c9a]">
          <div className="text-white text-xs sm:text-sm font-medium">
            👵 Grandma&apos;s Verdict:
          </div>
        </div>
        <div className="flex items-center justify-center gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5">
          <div className="text-white text-sm sm:text-base leading-relaxed">
            {text}
          </div>
        </div>
      </div>
    </div>
  );

  const footerClass = isFooterVisible
    ? "h-auto opacity-100 p-2"
    : "h-0 opacity-0 overflow-hidden p-0";


  return (
    <div className="w-[380px] lg:w-full max-w-[680px] h-auto max-h-[90vh] bg-white rounded-[32px] overflow-scroll relative flex flex-col">

      <div ref={shareableContentRef} className="">
        <div className="flex w-full items-center justify-center gap-2.5 px-4 py-4 sm:px-6 sm:py-6 bg-[#8359db] relative ">
          <img
            className="w-8 h-8 lg:w-11 lg:h-11"
            alt="Frame"
            src="/grandma.svg"
            // src="https://c.animaapp.com/mfik764dNmxQ7u/img/frame-6.svg"
          />
          <h1 className="font-semibold text-white text-lg sm:text-2xl">
            Grandma AI
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 sm:right-[18px] sm:top-[18px] w-6 h-6 p-0 hover:bg-transparent"
            onClick={() => {
              const event = new CustomEvent('closeModal');
              window.dispatchEvent(event);
            }}
          >
            <XIcon className="w-6 h-6 text-white" />
          </Button>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto p-4 space-y-4" ref={chatMessagesRef}>
          {messages.length === 0 && (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="font-normal text-[#716e77] text-base sm:text-lg">
                Ask Grandma anything!
              </div>
              <img
                className="w-12 h-14 sm:w-[57.66px] sm:h-[69.79px]"
                alt="Grandma logo"
                src="/grandma.svg"
                // src="https://c.animaapp.com/mfik764dNmxQ7u/img/grandma-logo-1.svg"
              />
            </div>
          )}

          <div
            className="flex flex-col gap-4 p-4"
            style={{ flexGrow: 1 }}
          >
            {messages.map((msg) =>
              msg.sender === "user" ? (
                <UserMessageCard key={msg.id} text={msg.text} imageUrl={msg.imageUrl} />
              ) : (
                <GrandmaMessageCard key={msg.id} text={msg.text} />
              ),
            )}
            {isLoading && (
              <div className="flex items-end gap-2 sm:gap-3">
                <img
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 flex-shrink-0 rounded-full"
                  src="https://c.animaapp.com/mfik764dNmxQ7u/img/frame-6.svg"
                  alt="Grandma avatar"
                  crossOrigin="anonymous"
                />
                <div className="flex items-center justify-center gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#8156d9] rounded-[24px_24px_24px_0px]">
                  <div className="text-white text-sm sm:text-base leading-relaxed">
                    Grandma is analyzing & typing...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer for Shareable Area - Controlled by `footerClass` */}
        {messages.length > 0 && (
          <div className={`text-center bg-white border-t border-[#dad8df] text-[#716e77] text-sm flex-shrink-0 transition-all duration-300 ${footerClass}`}>
            www.grandmaai.com
            <h1>Wise. witty & protective</h1>
          </div>
        )}
      </div>

      {messages.length > 0 && !isLoading && (
        <div className="flex flex-col items-center p-4 sm:p-6 gap-4 border-t border-[#dad8df] flex-shrink-0">
          <Button
            onClick={handleShareMeme}
            className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 py-2.5 bg-[#8359db] rounded-full font-semibold hover:bg-[#6b47c4] transition-colors"
          >
            <ImageIcon className="mr-2 h-4 w-4" /> Share Meme
          </Button>
          <Button
            onClick={handleAskAnotherQuestion}
            variant="ghost"
            className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 py-2.5 rounded-full border-2 border-[#8359db] text-[#8359db] font-semibold hover:bg-[#8359db] hover:text-white transition-colors"
          >
            Ask Another Question
          </Button>
        </div>
      )}

      <div className="flex w-full items-end gap-3 sm:gap-4 px-4 pb-6 sm:px-6 sm:pb-8  flex-shrink-0">

        {/* <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-solid border-[#dad8df] flex-shrink-0">
          <ImageIcon className="w-5 h-5 lg:w-6 lg-h-6 text-[#a2a2a2]" />
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label> */}

        <div className="flex flex-col flex-1">
          {uploadedImage && (
            <div className="relative w-24 h-24 mb-2">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600"
                onClick={() => setUploadedImage(null)}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
          {/* <div className="flex h-12 sm:h-14 items-center gap-2.5 px-3 sm:px-4 py-2.5 flex-1 rounded-full border border-solid border-[#dad8df]">
            <Input
              className="border-0 bg-transparent p-0 h-auto font-normal text-[#a2a2a2] text-sm sm:text-base placeholder:text-[#a2a2a2] focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Ask grandma anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && (input.trim() !== "" || uploadedImage)) {
                  sendMessage();
                }
              }}
            />
          </div> */}
          <div className=" items-start gap-2.5 px-3 sm:px-4 py-3 flex-1 rounded-lg border border-solid border-[#dad8df] overflow-y-auto">
  <textarea
    className=" min-h-20 border-0 bg-transparent p-0 w-full font-normal text-[#a2a2a2] text-sm sm:text-base placeholder:text-[#a2a2a2] placeholder:text-center focus-visible:ring-0 focus-visible:ring-offset-0 "
    placeholder="Ask grandma anything..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      // Use Shift + Enter to send the message
      if (e.key === 'Enter' && e.shiftKey && (input.trim() !== '' || uploadedImage)) {
        e.preventDefault();
        sendMessage();
      }
    }}
  />
</div>
        </div>
    

        <Button
          size="icon"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#8359db] hover:bg-[#7348ca] p-0 flex-shrink-0"
          onClick={sendMessage}
          disabled={isLoading || (input.trim() === "" && !uploadedImage)}
        >
          <SendHorizonalIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Overlay2;