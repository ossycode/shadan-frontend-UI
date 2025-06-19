import { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Upload,
  Smile,
  Paperclip,
  Send,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  MoreVertical,
  ChevronDown,
  Copy,
  MessageSquareMore,
  File,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Post } from "@/types/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { ScrollArea } from "./ui/scroll-area";
import { ContentForm } from "@/schemas/post";
import { useContentForm } from "@/hooks/useContentForm";
import { Controller } from "react-hook-form";
import { Description, DialogTitle } from "@radix-ui/react-dialog";

// interface Message {
//   id: string;
//   text: string;
//   sender: string;
//   timestamp: string;
//   isUser: boolean;
// }

// interface ContentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: Partial<Post>) => void;
//   editingPost?: Post | null;
//   triggerColumnId?: string;
//   allPosts?: Post[];
// }

// interface ContentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: ContentForm) => void;
//   /** If editing, pass the existing post data in here */
//   allPosts?: (ContentForm & { id: string })[];
//   defaultValues?: ContentForm & { id: string };
// }

// const sampleInternalMessages: Message[] = [
//   {
//     id: "1",
//     text: "Please review the content before posting",
//     sender: "Team Lead",
//     timestamp: "10:30 AM",
//     isUser: false,
//   },
//   {
//     id: "2",
//     text: "Will update the caption accordingly",
//     sender: "You",
//     timestamp: "10:35 AM",
//     isUser: true,
//   },
// ];

// const sampleClientMessages: Message[] = [
//   {
//     id: "1",
//     text: "The banner looks great! Can we adjust the timing?",
//     sender: "Client",
//     timestamp: "09:15 AM",
//     isUser: false,
//   },
//   {
//     id: "2",
//     text: "Of course! What time would work better?",
//     sender: "You",
//     timestamp: "09:20 AM",
//     isUser: true,
//   },
// ];

// const ContentModal = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   allPosts,
//   defaultValues,
// }: ContentModalProps) => {
//   // const [title, setTitle] = useState("");
//   // const [isEditingTitle, setIsEditingTitle] = useState(false);
//   // const [description, setDescription] = useState("");
//   // const [scheduledDate, setScheduledDate] = useState("");
//   // const [scheduledTime, setScheduledTime] = useState("");
//   // const [assignee, setAssignee] = useState("");
//   // const [status, setStatus] = useState("");
//   // const [platform, setPlatform] = useState("");
//   // const [autoPost, setAutoPost] = useState(false);
//   // const [notes, setNotes] = useState("");
//   // const [uploadedImage, setUploadedImage] = useState("");
//   const [activeTab, setActiveTab] = useState<"internal" | "client">("internal");
//   const [messageText, setMessageText] = useState("");
//   const [internalMessages, setInternalMessages] = useState<Message[]>();
//   const [clientMessages, setClientMessages] = useState<Message[]>();
//   // const [currentPostIndex, setCurrentPostIndex] = useState(0);
//   // const [isDirty, setIsDirty] = useState(false);
//   const [idx, setIdx] = useState(() =>
//     defaultValues ? allPosts.findIndex((p) => p.id === defaultValues.id) : -1
//   );

//   const {
//     register,
//     control,
//     onSubmit: handleFormSubmit,
//     formState: { errors },
//     isDirty,
//     reset,
//   } = useContentForm(onSubmit, defaultValues);

//   const now = new Date();
//   const formattedDate = format(now, "EEE, MMM dd, yyyy");
//   const formattedTime = format(now, "hh:mm a");

//   const handleSendMessage = () => {
//     if (!messageText.trim()) return;

//     const newMessage: Message = {
//       id: `msg-${Date.now()}`,
//       text: messageText,
//       sender: "You",
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       isUser: true,
//     };

//     if (activeTab === "internal") {
//       setInternalMessages((prev) => [...prev, newMessage]);
//     } else {
//       setClientMessages((prev) => [...prev, newMessage]);
//     }

//     setMessageText("");
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const currentMessages =
//     activeTab === "internal" ? internalMessages ?? [] : clientMessages ?? [];

//   // const handleClose = () => {
//   //   if (isDirty) {
//   //     handleSubmit();
//   //   }
//   //   onClose();
//   // };

//   const goPrev = () => {
//     if (idx > 0) {
//       const prev = allPosts?.[idx - 1];
//       setIdx(idx - 1);
//       reset(prev);
//     }
//   };
//   const goNext = () => {
//     if (idx < allPosts?.length - 1) {
//       const nxt = allPosts[idx + 1];
//       setIdx(idx + 1);
//       reset(nxt);
//     }
//   };

//   return (
//     <Dialog open={isOpen}>
//       <DialogContent
//         className="max-w-6xl h-[90vh] p-0 overflow-hidden flex flex-col"
//         title="Create Content"
//       >
//         <div className="bg-white rounded-lg shadow-lg flex flex-col h-full">
//           {/* Header - Fixed */}
//           {/* <div className="flex items-center justify-between p-6 pb-4 flex-shrink-0">
//             <div className="flex items-center gap-4">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handlePrevious}
//                 disabled={
//                   currentPostIndex === 0 || !allPosts || allPosts.length <= 1
//                 }
//                 className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600"
//               >
//                 <ChevronLeft className="w-4 h-4 mr-1" />
//                 Previous
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleNext}
//                 disabled={
//                   !allPosts ||
//                   currentPostIndex === allPosts.length - 1 ||
//                   allPosts.length <= 1
//                 }
//                 className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600"
//               >
//                 Next
//                 <ChevronRight className="w-4 h-4 ml-1" />
//               </Button>
//             </div>
//             <div className="flex items-center gap-2">
//               <Button variant="outline" size="sm" className="h-8">
//                 <Copy />
//                 Post Organically
//               </Button>
//               <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
//                 <MoreVertical className="w-4 h-4" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => onClose()}
//                 className="h-8 w-8 p-0"
//               >
//                 <X className="w-6 h-6" />
//               </Button>
//             </div>
//           </div> */}

//           <div className="flex items-center justify-between p-4 border-b">
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={goPrev}
//                 disabled={idx === 0 || !allPosts}
//                 className="px-2"
//               >
//                 <ChevronLeft />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={goNext}
//                 disabled={idx === allPosts?.length - 1 || !allPosts}
//                 className="px-2"
//               >
//                 <ChevronRight />
//               </Button>
//             </div>
//             <div className="flex items-center gap-2">
//               <Button variant="outline" size="sm">
//                 <Copy /> Post Organically
//               </Button>
//               <Button variant="ghost" size="sm">
//                 <MoreVertical />
//               </Button>
//               <Button variant="ghost" size="sm" onClick={onClose}>
//                 <X />
//               </Button>
//             </div>
//           </div>

//           <div className="border-t border-gray-200 flex-shrink-0"></div>

//           {/* Main content area - Flexible */}
//           <div className="flex flex-1 min-h-0">
//             {/* Left panel - Scrollable content */}

//             {defaultValues ? (
//               <EditContent onSubmit={onSubmit} defaultValues={defaultValues} />
//             ) : (
//               <CreateContent
//                 onSubmit={onSubmit}
//                 defaultValues={defaultValues}
//               />
//             )}
//             {/* Right panel - Chat (Fixed) */}
//             <div className="w-80 border-l border-gray-200 flex flex-col flex-shrink-0">
//               {/* Chat tabs */}
//               <div className="p-4 border-b bg-white flex-shrink-0">
//                 <div className="relative bg-gray-100 rounded-xl p-1 flex">
//                   <div
//                     className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-lg shadow-sm transition-transform duration-200 ease-in-out ${
//                       activeTab === "client" ? "translate-x-full" : ""
//                     }`}
//                   ></div>
//                   <button
//                     className={`relative z-10 flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 ${
//                       activeTab === "internal"
//                         ? "text-gray-900"
//                         : "text-gray-600"
//                     }`}
//                     onClick={() => setActiveTab("internal")}
//                   >
//                     Internal Chat
//                   </button>
//                   <button
//                     className={`relative z-10 flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 ${
//                       activeTab === "client" ? "text-gray-900" : "text-gray-600"
//                     }`}
//                     onClick={() => setActiveTab("client")}
//                   >
//                     Client Chat
//                   </button>
//                 </div>
//               </div>

//               {/* Chat content */}
//               <div className="flex-1 p-4 flex flex-col min-h-0">
//                 {currentMessages?.length === 0 ? (
//                   <div className="flex-1 flex flex-col items-center justify-center text-center">
//                     <div className="w-12 h-12 border border-gray-200 shadow-inner rounded-md flex items-center justify-center mb-4">
//                       <MessageSquareMore className="w-6 h-6 text-gray-600" />
//                     </div>
//                     <h3 className="text-sm font-medium text-gray-900 mb-2">
//                       {activeTab === "internal"
//                         ? "Internal Chat"
//                         : "Client Chat"}
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       {activeTab === "internal"
//                         ? "Only your team members will be able to see this chat. Use it to collaborate internally."
//                         : "This is the client chat section. Use it to communicate with your client."}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="flex-1 overflow-auto">
//                     <div className="space-y-3">
//                       {currentMessages.map((message) => (
//                         <div
//                           key={message.id}
//                           className={`flex ${
//                             message.isUser ? "justify-end" : "justify-start"
//                           }`}
//                         >
//                           <div
//                             className={`max-w-[80%] rounded-lg p-3 ${
//                               message.isUser
//                                 ? "bg-blue-600 text-white"
//                                 : "bg-gray-100 text-gray-900"
//                             }`}
//                           >
//                             <p className="text-sm">{message.text}</p>
//                             <p className="text-xs opacity-70 mt-1">
//                               {message.timestamp}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Message Input */}
//               <div className="p-4  flex-shrink-0">
//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="p-2 border border-gray-200 shadow-inner rounded-md flex items-center justify-center"
//                   >
//                     <Paperclip className="w-4 h-4 " />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="p-2 border border-gray-200 shadow-inner rounded-md flex items-center justify-center"
//                   >
//                     <Smile className="w-4 h-4" />
//                   </Button>

//                   <div className="flex-1 flex">
//                     <Input
//                       value={messageText}
//                       onChange={(e) => setMessageText(e.target.value)}
//                       placeholder="Leave a comment..."
//                       className="border border-gray-200 shadow-inner rounded-md flex items-center justify-center"
//                       onKeyDown={handleKeyPress}
//                       onKeyUp={handleKeyPress}
//                     />
//                     <Button
//                       onClick={handleSendMessage}
//                       className="ml-2 bg-blue-700"
//                       size="sm"
//                     >
//                       <Send className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  isUser: boolean;
}

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Post>) => void;
  editingPost?: Post | null;
  triggerColumnId?: string;
  allPosts?: Post[];
}

const ContentModal = ({
  isOpen,
  onClose,
  onSubmit,
  editingPost,
  triggerColumnId,
  allPosts = [],
}: ContentModalProps) => {
  const [title, setTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [description, setDescription] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("");
  const [platform, setPlatform] = useState("");
  const [autoPost, setAutoPost] = useState(false);
  const [notes, setNotes] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [activeTab, setActiveTab] = useState<"internal" | "client">("internal");
  const [messageText, setMessageText] = useState("");
  const [internalMessages, setInternalMessages] = useState<Message[]>([]);
  const [clientMessages, setClientMessages] = useState<Message[]>([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (editingPost && allPosts && allPosts.length > 0) {
      const index = allPosts.findIndex((post) => post.id === editingPost.id);
      if (index !== -1) {
        setCurrentPostIndex(index);
      }
    }
  }, [editingPost, allPosts]);

  const now = new Date();
  const formattedDate = format(now, "EEE, MMM dd, yyyy");
  const formattedTime = format(now, "hh:mm a");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || "Untitled Content");
      setDescription(editingPost.description || "");
      setScheduledDate(editingPost.date || "");
      setScheduledTime(editingPost.time || "");
      setAssignee(editingPost.author || "");
      setStatus("");
      setPlatform("");
      setAutoPost(false);
      setNotes(editingPost.notes || "");
      setUploadedImage(editingPost.image || "");
    } else {
      setTitle("Create Content - User Profile Page");
      setDescription("");
      setScheduledDate(formattedDate);
      setScheduledTime(formattedTime);
      setAssignee("");
      setStatus("");
      setPlatform("");
      setAutoPost(false);
      setNotes("");
      setUploadedImage("");
    }
    setIsEditingTitle(false);
    setIsDirty(false);
  }, [editingPost, isOpen, formattedDate, formattedTime]);

  const handleChange = (field: string, value: string) => {
    setIsDirty(true);
    switch (field) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "scheduledDate":
        setScheduledDate(value);
        break;
      case "scheduledTime":
        setScheduledTime(value);
        break;
      case "assignee":
        setAssignee(value);
        break;
      case "status":
        setStatus(value);
        break;
      case "platform":
        setPlatform(value);
        break;
      case "notes":
        setNotes(value);
        break;
    }
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditingTitle(false);
    }
  };

  const handleSubmit = () => {
    const formData: Partial<Post> = {
      id: editingPost?.id,
      title: title || "Create Content - User Profile Page",
      description,
      date: scheduledDate || formattedDate,
      time: scheduledTime || formattedTime,
      platforms: editingPost?.platforms || ["tiktok", "instagram", "facebook"],
      image:
        uploadedImage ||
        "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
      author: assignee || "John Doe",
      likes: editingPost?.likes || 0,
      notes,
    };

    onSubmit(formData);
    setIsDirty(false);
    onClose();
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text: messageText,
      sender: "You",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isUser: true,
    };

    if (activeTab === "internal") {
      setInternalMessages((prev) => [...prev, newMessage]);
    } else {
      setClientMessages((prev) => [...prev, newMessage]);
    }

    setMessageText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePrevious = () => {
    if (allPosts && allPosts.length > 0 && currentPostIndex > 0) {
      const prevPost = allPosts[currentPostIndex - 1];
      setCurrentPostIndex(currentPostIndex - 1);
      setTitle(prevPost.title || "Untitled Content");
      setDescription(prevPost.description || "");
      setScheduledDate(prevPost.date || "");
      setScheduledTime(prevPost.time || "");
      setAssignee(prevPost.author || "");
      setStatus("");
      setPlatform("");
      setAutoPost(false);
      setNotes(prevPost.notes || "");
      setUploadedImage(prevPost.image || "");
      setIsEditingTitle(false);
    }
  };

  const handleNext = () => {
    if (
      allPosts &&
      allPosts.length > 0 &&
      currentPostIndex < allPosts.length - 1
    ) {
      const nextPost = allPosts[currentPostIndex + 1];
      setCurrentPostIndex(currentPostIndex + 1);
      setTitle(nextPost.title || "Untitled Content");
      setDescription(nextPost.description || "");
      setScheduledDate(nextPost.date || "");
      setScheduledTime(nextPost.time || "");
      setAssignee(nextPost.author || "");
      setStatus("");
      setPlatform("");
      setAutoPost(false);
      setNotes(nextPost.notes || "");
      setUploadedImage(nextPost.image || "");
      setIsEditingTitle(false);
    }
  };

  const currentMessages =
    activeTab === "internal" ? internalMessages : clientMessages;

  const handleClose = () => {
    if (isDirty) {
      handleSubmit();
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTitle></DialogTitle>
      <DialogContent
        className="max-w-6xl h-[90vh] p-0 overflow-hidden flex flex-col"
        aria-describedby="Create Content"
      >
        <div className="bg-white rounded-lg shadow-lg flex flex-col h-full">
          {/* Header - Fixed */}
          <div className="flex items-center justify-between p-6 pb-4 flex-shrink-0">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={
                  currentPostIndex === 0 || !allPosts || allPosts.length <= 1
                }
                className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={
                  !allPosts ||
                  currentPostIndex === allPosts.length - 1 ||
                  allPosts.length <= 1
                }
                className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <Copy />
                Post Organically
              </Button>
              <Button
                onClick={handleSubmit}
                className="ml-2 bg-blue-700"
                size="sm"
              >
                {editingPost ? "Update Post" : "Create Post"}
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200 flex-shrink-0"></div>

          {/* Main content area - Flexible */}
          <div className="flex flex-1 min-h-0">
            {/* Left panel - Scrollable content */}
            <div className=" min-h-0 overflow-y-auto flex flex-col flex-1">
              <div className="flex gap-6 mb-4 px-6 pt-4 h-[65%] ">
                {/* Image upload section */}
                <div className="flex flex-col flex-shrink-0 ">
                  <div
                    className="flex-1 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-center bg-white cursor-pointer hover:border-gray-300 transition-colors"
                    style={{ width: "280px", height: "280px" }}
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                  >
                    {uploadedImage ? (
                      <div className="relative w-full h-full">
                        <img
                          src={uploadedImage}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          className="absolute top-2 right-2 p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedImage("");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 48 48"
                            className="text-slate-100"
                          >
                            <g
                              fill="none"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth={4}
                            >
                              <path
                                strokeLinecap="round"
                                d="M13 12.432v-4.62A2.813 2.813 0 0 1 15.813 5h24.374A2.813 2.813 0 0 1 43 7.813v24.375A2.813 2.813 0 0 1 40.188 35h-4.672"
                              ></path>
                              <path
                                fill="currentColor"
                                d="M32.188 13H7.811A2.813 2.813 0 0 0 5 15.813v24.374A2.813 2.813 0 0 0 7.813 43h24.375A2.813 2.813 0 0 0 35 40.188V15.811A2.813 2.813 0 0 0 32.188 13Z"
                              ></path>
                            </g>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-10 h-10 border border-dashed border-gray-300 rounded mb-4 flex items-center justify-center">
                          <Plus className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Click to upload</span>{" "}
                          <span className="text-gray-500">
                            or drag and drop
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          PNG or JPG (max. 800x400px)
                        </div>
                      </>
                    )}
                  </div>
                  <div className="my-4">
                    <div
                      className="border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                      style={{ width: "70px", height: "70px" }}
                    >
                      <Plus className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setUploadedImage(URL.createObjectURL(file));
                      }
                    }}
                  />
                </div>

                {/* Form fields */}
                <div className="flex-1 min-w-0">
                  <div className="mb-4">
                    {isEditingTitle ? (
                      <div className="flex items-center">
                        <span className="text-xl font-medium text-gray-900 mr-2">
                          Edit Content -
                        </span>
                        <Input
                          value={title}
                          onChange={(e) =>
                            handleChange("title", e.target.value)
                          }
                          onBlur={handleTitleBlur}
                          onKeyDown={handleTitleKeyDown}
                          className="text-xl font-medium bg-transparent border-none p-0 h-auto focus:ring-0 focus:border-none shadow-none outline-none flex-1"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <h1
                        className="text-xl font-medium cursor-pointer hover:bg-gray-50 p-1 rounded"
                        onClick={handleTitleClick}
                        title="Click to edit title"
                      >
                        {editingPost ? (
                          <>
                            <span>Edit Content - </span>
                            <span className="underline decoration-dotted decoration-gray-400">
                              {title}
                            </span>
                          </>
                        ) : (
                          title
                        )}
                      </h1>
                    )}
                  </div>

                  <div className="space-y-3">
                    {/* Assignee */}
                    <div className="flex items-center gap-4">
                      <label className="text-sm text-gray-700 w-20 flex-shrink-0">
                        Assignee
                      </label>
                      <div className="relative flex-1">
                        <Input
                          value={assignee}
                          onChange={(e) =>
                            handleChange("assignee", e.target.value)
                          }
                          placeholder="Assignee"
                          className="pr-10 border-gray-200 h-9"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Plus className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="flex items-start gap-4">
                      <label className="text-sm text-gray-700 w-20 flex-shrink-0 mt-2">
                        Caption
                      </label>
                      <div className="flex-1">
                        <Textarea
                          value={description}
                          onChange={(e) =>
                            handleChange("description", e.target.value)
                          }
                          placeholder="Write your caption..."
                          className="min-h-[80px] resize-none border-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="flex items-center gap-4">
                      <label className="text-sm text-gray-700 w-20 flex-shrink-0">
                        Schedule
                      </label>
                      <div className="flex gap-3 flex-1">
                        <Input
                          value={scheduledDate}
                          onChange={(e) =>
                            handleChange("scheduledDate", e.target.value)
                          }
                          className="flex-1 text-sm border-gray-200 h-9"
                          readOnly
                        />
                        <Input
                          value={scheduledTime}
                          onChange={(e) =>
                            handleChange("scheduledTime", e.target.value)
                          }
                          className="w-24 text-sm border-gray-200 h-9"
                          readOnly
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-4">
                      <label className="text-sm text-gray-700 w-20 flex-shrink-0">
                        Status
                      </label>
                      <div className="flex-1">
                        <Select value={status} onValueChange={setStatus}>
                          <SelectTrigger className="h-9 border-gray-200">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="review">Review</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Platform */}
                    <div className="flex items-center gap-4">
                      <label className="text-sm text-gray-700 w-20 flex-shrink-0">
                        Platform
                      </label>
                      <div className="flex gap-3 flex-1">
                        <Select value={platform} onValueChange={setPlatform}>
                          <SelectTrigger className="h-9 border-gray-200 flex-1">
                            <SelectValue placeholder="Platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="tiktok">TikTok</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9 w-9 p-0 border-gray-200"
                        >
                          <Plus className="w-4 h-4 text-gray-400" />
                        </Button>
                      </div>
                    </div>

                    {/* Auto Post */}
                    <div className="flex items-center gap-4">
                      <label className="text-sm text-gray-700 w-20 flex-shrink-0">
                        Auto Post
                      </label>
                      <div className="flex items-center">
                        <Switch
                          checked={autoPost}
                          onCheckedChange={setAutoPost}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes section - Now part of scrollable content */}
              <div className="flex flex-col flex-1 ">
                <div className="flex-1 ">
                  <Textarea
                    value={notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    placeholder="Write notes for your editors, ideas, examples..."
                    className={`resize-none border-gray-200 text-sm w-full h-full rounded-none pt-3 focus:outline-none focus:ring-0 focus:border-gray-400 focus:shadow-none ${
                      editingPost ? "" : ""
                    } `}
                    rows={Math.max(5, notes.split("\n").length)}
                  />
                </div>

                {/* Formatting toolbar */}
                <div className="min-h-16 flex items-center px-3">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-7 w-7 text-gray-400"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-7 w-7 text-gray-400 "
                    >
                      <div className="h-3.5 flex items-center border-l border-gray-200 px-3">
                        <List className="w-3.5 h-3.5" />
                      </div>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-7 w-7 text-gray-400"
                    >
                      <div className="h-3.5 flex items-center border-l border-gray-200 px-3">
                        <Smile className="w-3.5 h-3.5" />
                      </div>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-7 w-7 text-gray-400"
                    >
                      <div className="h-3.5 flex items-center border-l border-gray-200 px-3">
                        <File className="w-3.5 h-3.5" />
                      </div>
                    </Button>

                    <Button variant="ghost" size="sm" className="p-1 h-7 w-7 ">
                      <div className="h-3.5 flex items-center border-l border-gray-200 px-3">
                        <Link className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right panel - Chat (Fixed) */}
            <div className="w-80 border-l border-gray-200 flex flex-col flex-shrink-0">
              {/* Chat tabs */}
              <div className="p-4 border-b bg-white flex-shrink-0">
                <div className="relative bg-gray-100 rounded-xl p-1 flex">
                  <div
                    className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-lg shadow-sm transition-transform duration-200 ease-in-out ${
                      activeTab === "client" ? "translate-x-full" : ""
                    }`}
                  ></div>
                  <button
                    className={`relative z-10 flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 ${
                      activeTab === "internal"
                        ? "text-gray-900"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("internal")}
                  >
                    Internal Chat
                  </button>
                  <button
                    className={`relative z-10 flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 ${
                      activeTab === "client" ? "text-gray-900" : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("client")}
                  >
                    Client Chat
                  </button>
                </div>
              </div>

              {/* Chat content */}
              <div className="flex-1 p-4 flex flex-col min-h-0">
                {currentMessages?.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 border border-gray-200 shadow-inner rounded-md flex items-center justify-center mb-4">
                      <MessageSquareMore className="w-6 h-6 text-gray-600" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      {activeTab === "internal"
                        ? "Internal Chat"
                        : "Client Chat"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {activeTab === "internal"
                        ? "Only your team members will be able to see this chat. Use it to collaborate internally."
                        : "This is the client chat section. Use it to communicate with your client."}
                    </p>
                  </div>
                ) : (
                  <div className="flex-1 overflow-auto">
                    <div className="space-y-3">
                      {currentMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.isUser ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.isUser
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-4  flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 border border-gray-200 shadow-inner rounded-md flex items-center justify-center"
                  >
                    <Paperclip className="w-4 h-4 " />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 border border-gray-200 shadow-inner rounded-md flex items-center justify-center"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>

                  <div className="flex-1 flex">
                    <Input
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Leave a comment..."
                      className="border border-gray-200 shadow-inner rounded-md flex items-center justify-center"
                      onKeyDown={handleKeyPress}
                      onKeyUp={handleKeyPress}
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="ml-2 bg-blue-700"
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentModal;
