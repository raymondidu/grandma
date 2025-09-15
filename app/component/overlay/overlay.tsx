
// "use client";
// import React, { JSX, useState, useRef } from "react";
// import { ImageIcon, XIcon, SendHorizonalIcon } from "lucide-react";
// import { Button } from "../../component/ui/button";
// import { Input } from "../../component/overlay/input";
// import html2canvas from 'html2canvas';

// type Message = {
//   id: number;
//   sender: "user" | "grandma";
//   text: string;
// };

// export const Overlay = (): JSX.Element => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const chatRef = useRef<HTMLDivElement>(null);

//   const sendMessage = async () => {
//     if (input.trim() === "") return;

    
//     const newUserMessage: Message = {
//       id: Date.now(),
//       sender: "user",
//       text: input,
//     };
//     setMessages((prev) => [...prev, newUserMessage]);
//     setInput("");
//     setIsLoading(true);

//     // await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
//   const res = await fetch("/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: input }),
//     });

//     const data = await res.json();
//     console.log(data.reply);
//     const grandmaResponse: Message = {
//       id: Date.now() + 1,
//       sender: "grandma",
//     //    text: "Sweetheart, flows are for rivers — not relationships. Dump him 🚩.",
//         text: data.reply,
//     };

//     setMessages((prev) => [...prev, grandmaResponse]);
//     setIsLoading(false);
//   };

//   const handleShareMeme = () => {
//     if (!chatRef.current) {
//       console.error("Chat reference is not available for screenshot.");
//       return;
//     }

//     // Small delay to ensure all DOM updates and image loads are complete
//     setTimeout(() => {
//       html2canvas(chatRef.current!, {
//         useCORS: true, // Crucial for external images to be included if served with CORS headers
//         allowTaint: true, // Allows tainting the canvas for cross-origin images (less secure but can help)
//         // Adjust scale for higher resolution screenshots if needed
//         // scale: 2,
//       }).then((canvas) => {
//         const dataUrl = canvas.toDataURL("image/png");

//         if (navigator.share) {
//           // Use Web Share API for native sharing on supported platforms (mobile)
//           navigator.share({
//             title: 'Grandma.AI Verdict',
//             text: 'Check out this savage wisdom from Grandma.AI!',
//             files: [new File([dataURLtoBlob(dataUrl)], "grandma-meme.png", { type: "image/png" })],
//           }).then(() => console.log('Successful share'))
//             .catch((error) => {
//               console.error('Error sharing using Web Share API:', error);
//               // Fallback for devices that don't support file sharing or if an error occurs
//               downloadImage(dataUrl);
//             });
//         } else {
//           // Fallback for desktop or unsupported browsers (downloads the image)
//           downloadImage(dataUrl);
//         }
//       }).catch((error) => {
//         console.error("Error generating screenshot:", error);
//       });
//     }, 100); // 100ms delay
//   };

//   // Helper function to convert data URL to Blob for navigator.share files array
//   const dataURLtoBlob = (dataurl: string) => {
//     const arr = dataurl.split(',');
//     const mimeMatch = arr[0].match(/:(.*?);/);
//     const mime = mimeMatch ? mimeMatch[1] : 'image/png';
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new Blob([u8arr], { type: mime });
//   };

//   const downloadImage = (dataUrl: string) => {
//     const link = document.createElement("a");
//     link.href = dataUrl;
//     link.download = "grandma-meme.png";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleAskAnotherQuestion = () => {
//     setMessages([]);
//     setIsLoading(false);
//   };

//   const UserMessageCard = ({ text }: { text: string }) => (
//     <div className="flex items-end justify-end gap-2 sm:gap-3">
//       <div className="flex max-w-[85%] sm:max-w-[75%] items-center justify-center gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#ffe7dd] rounded-[24px_24px_0px_24px]">
//         <div className="text-[#1e1e1e] text-sm sm:text-base leading-relaxed">
//           {text}
//         </div>
//       </div>
//       <img
//         className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 flex-shrink-0 rounded-full" // Added rounded-full for avatar style
//         src="https://c.animaapp.com/mfhdz9vioM8Kab/img/frame-6-1.svg"
//         alt="User avatar"
//         crossOrigin="anonymous" // Crucial for CORS if images are from external domain
//       />
//     </div>
//   );

//   const GrandmaMessageCard = ({ text }: { text: string }) => (
//     <div className="flex items-end gap-2 sm:gap-3">
//       <img
//         className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 flex-shrink-0 rounded-full" // Added rounded-full for avatar style
//         src="https://c.animaapp.com/mfhdz9vioM8Kab/img/frame-6.svg"
//         alt="Grandma avatar"
//         crossOrigin="anonymous" // Crucial for CORS if images are from external domain
//       />
//       <div className="flex flex-col max-w-[85%] sm:max-w-[75%] bg-[#8156d9] rounded-[24px_24px_24px_0px] overflow-hidden">
//         <div className="flex items-center justify-center gap-2.5 px-3 py-1 sm:px-4 sm:py-1 bg-[#502c9a]">
//           <div className="text-white text-xs sm:text-sm font-medium">
//             👵 Grandma&apos;s Verdict:
//           </div>
//         </div>
//         <div className="flex items-center justify-center gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5">
//           <div className="text-white text-sm sm:text-base leading-relaxed">
//             {text}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="w-full max-w-[680px] h-auto max-h-[90vh] bg-white rounded-[32px] overflow-scroll relative">
//       {/* Header */}
//       <div className="flex w-full items-center justify-center gap-2.5 px-4 py-4 sm:px-6 sm:py-6 bg-[#8359db] relative">
//         <img
//           className="w-8 h-8 sm:w-11 sm:h-11"
//           alt="Frame"
//           src="https://c.animaapp.com/mfik764dNmxQ7u/img/frame-6.svg"
//         />
//         <h1 className="font-semibold text-white text-lg sm:text-2xl">
//           Grandma.AI
//         </h1>
//         <Button
//           variant="ghost"
//           size="icon"
//           className="absolute right-4 top-4 sm:right-[18px] sm:top-[18px] w-6 h-6 p-0 hover:bg-transparent"
//           onClick={() => {
//             const event = new CustomEvent('closeModal');
//             window.dispatchEvent(event);
//           }}
//         >
//           <XIcon className="w-6 h-6 text-white" />
//         </Button>
//       </div>

//       {/* Content */}
//       <div className="flex flex-col flex-1 overflow-y-auto p-4 space-y-4 ">
//         {messages.length === 0 && ( // Show initial message only if no messages
//           <div className="flex flex-col items-center gap-4 text-center">
//             <div className="font-normal text-[#716e77] text-base sm:text-lg">
//               Ask Grandma anything!
//             </div>
//             <img // Grandma logo for initial state
//               className="w-12 h-14 sm:w-[57.66px] sm:h-[69.79px]"
//               alt="Grandma logo"
//               src="https://c.animaapp.com/mfik764dNmxQ7u/img/grandma-logo-1.svg"
//             />
//           </div>
//         )}

//         <div
//           ref={chatRef}
//           className="flex flex-col gap-4 overflow-y-auto p-4" // Removed min-h from here for dynamic growth
//           style={{ flexGrow: 1 }} // Allows chat area to expand
//         >
//           {messages.map((msg) =>
//             msg.sender === "user" ? (
//               <UserMessageCard key={msg.id} text={msg.text} />
//             ) : (
//               <GrandmaMessageCard key={msg.id} text={msg.text} />
//             ),
//           )}
//           {isLoading && (
//             <div className="flex items-end gap-2 sm:gap-3">
//               <img
//                 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 flex-shrink-0 rounded-full" // Added rounded-full
//                 src="https://c.animaapp.com/mfik764dNmxQ7u/img/frame-6.svg"
//                 alt="Grandma avatar"
//                 crossOrigin="anonymous"
//               />
//               <div className="flex items-center justify-center gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#8156d9] rounded-[24px_24px_24px_0px]">
//                 <div className="text-white text-sm sm:text-base leading-relaxed">
//                   Grandma is analyzing & typing...
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
      
//       {messages.length > 0 && !isLoading && (
//         <div className="flex flex-col items-center p-4 sm:p-6 gap-4 border-t border-[#dad8df]">
//           <Button
//             onClick={handleShareMeme}
//             className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 py-2.5 bg-[#8359db] rounded-full font-semibold hover:bg-[#6b47c4] transition-colors"
//           >
//             <ImageIcon className="mr-2 h-4 w-4" /> Share Meme
//           </Button>
//           <Button
//             onClick={handleAskAnotherQuestion}
//             variant="ghost"
//             className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 py-2.5 rounded-full border-2 border-[#8359db] text-[#8359db] font-semibold hover:bg-[#8359db] hover:text-white transition-colors"
//           >
//             Ask Another Question
//           </Button>
//         </div>
//       )}

//       {/* Input Section */}
//       <div className="flex w-full items-center gap-3 sm:gap-4 px-4 pb-6 sm:px-6 sm:pb-8  border-[#dad8df]"> {/* Added border-t */}
//         <div className="flex h-12 sm:h-14 items-center gap-2.5 px-3 sm:px-4 py-2.5 flex-1 rounded-full border border-solid border-[#dad8df]">
//           <Input
//             className="border-0 bg-transparent p-0 h-auto font-normal text-[#a2a2a2] text-sm sm:text-base placeholder:text-[#a2a2a2] focus-visible:ring-0 focus-visible:ring-offset-0"
//             placeholder="Ask grandma anything..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => {
//               if (e.key === "Enter") {
//                 sendMessage();
//               }
//             }}
//           />
//         </div>

//         <Button
//           size="icon"
//           className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#8359db] hover:bg-[#7348ca] p-0 flex-shrink-0"
//           onClick={sendMessage}
//           disabled={isLoading}
//         >
//           <SendHorizonalIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//         </Button>
//       </div>
//     </div>
//   );
// };



// this version supports image upload
"use client";
import React, { JSX, useState, useRef } from "react";
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

export const Overlay = (): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    // Return if both input and uploadedImage are empty
    if (input.trim() === "" && !uploadedImage) return;

    const newUserMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
      imageUrl: uploadedImage || undefined,
    };

      const formData = new FormData();
    if (input) formData.append("message", input);
    if (uploadedImage) formData.append("image", uploadedImage);


    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setUploadedImage(null); // Clear the image after sending
    setIsLoading(true);

    // TODO: Replace with your actual API call to send the message and image.
    // Example: fetch('/api/grandma', { method: 'POST', body: JSON.stringify({ text: input, imageUrl: uploadedImage })})
    // await new Promise((resolve) => setTimeout(resolve, 1500)); 
const res = await fetch("/api/chat", {
      method: "POST",
      body: formData,
    //   body: JSON.stringify({ message: input, file:uploadedImage }),
    });

    const data = await res.json();
    console.log(data.reply);

    const grandmaResponse: Message = {
      id: Date.now() + 1,
      sender: "grandma",
    //    text: "Sweetheart, flows are for rivers — not relationships. Dump him 🚩.",
        text: data.reply,
    };
    

    setMessages((prev) => [...prev, grandmaResponse]);
    setIsLoading(false);
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
    if (!chatRef.current) {
      console.error("Chat reference is not available for screenshot.");
      return;
    }

    setTimeout(() => {
      html2canvas(chatRef.current!, {
        useCORS: true,
        allowTaint: true,
      }).then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");

        if (navigator.share) {
          navigator.share({
            title: 'Grandma.AI Verdict',
            text: 'Check out this savage wisdom from Grandma.AI!',
            files: [new File([dataURLtoBlob(dataUrl)], "grandma-meme.png", { type: "image/png" })],
          }).then(() => console.log('Successful share'))
            .catch((error) => {
            //   console.error('Error sharing using Web Share API:', error);
              downloadImage(dataUrl);
            });
        } else {
          downloadImage(dataUrl);
        }
      }).catch((error) => {
        console.error("Error generating screenshot:", error);
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
            className="rounded-lg mb-2"
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
        src="https://c.animaapp.com/mfhdz9vioM8Kab/img/frame-6.svg"
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

  return (
    <div className="w-full max-w-[680px] h-auto max-h-[90vh] bg-white rounded-[32px] overflow-scroll relative">
      {/* Header */}
      <div className="flex w-full items-center justify-center gap-2.5 px-4 py-4 sm:px-6 sm:py-6 bg-[#8359db] relative">
        <img
          className="w-8 h-8 sm:w-11 sm:h-11"
          alt="Frame"
          src="https://c.animaapp.com/mfik764dNmxQ7u/img/frame-6.svg"
        />
        <h1 className="font-semibold text-white text-lg sm:text-2xl">
          Grandma.AI
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

      {/* Content */}
      <div className="flex flex-col flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="font-normal text-[#716e77] text-base sm:text-lg">
              Ask Grandma anything!
            </div>
            <img 
              className="w-12 h-14 sm:w-[57.66px] sm:h-[69.79px]"
              alt="Grandma logo"
              src="https://c.animaapp.com/mfik764dNmxQ7u/img/grandma-logo-1.svg"
            />
          </div>
        )}

        <div
          ref={chatRef}
          className="flex flex-col gap-4 overflow-y-auto p-4"
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
      
      {messages.length > 0 && !isLoading && (
        <div className="flex flex-col items-center p-4 sm:p-6 gap-4 border-t border-[#dad8df]">
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

      {/* Input Section - Refined to include image upload */}
      <div className="flex w-full items-end gap-3 sm:gap-4 px-4 pb-6 sm:px-6 sm:pb-8 border-t border-[#dad8df]">
        {/* Hidden file input wrapped in a clickable label */}

        {/* <label htmlFor="file-upload" className="cursor-pointer">
          <ImageIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#a2a2a2]" />
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label> */}
        
        <div className="flex flex-col flex-1">
          {/* Image preview with a close button */}
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
          {/* Text Input */}
          <div className="flex h-12 sm:h-14 items-center gap-2.5 px-3 sm:px-4 py-2.5 flex-1 rounded-full border border-solid border-[#dad8df]">
            <Input
              className="border-0 bg-transparent p-0 h-auto font-normal text-[#a2a2a2] text-sm sm:text-base placeholder:text-[#a2a2a2] focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Ask grandma anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            //   onKeyPress={(e) => {
            //     if (e.key === "Enter") {
            //       sendMessage();
            //     }
            //   }}
            />
          </div>
        </div>

        <Button
          size="icon"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#8359db] hover:bg-[#7348ca] p-0 flex-shrink-0"
          onClick={sendMessage}
          // Button is disabled if no text and no image
          disabled={isLoading || (input.trim() === "" && !uploadedImage)}
        >
          <SendHorizonalIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Overlay;