"use client"
import Cognitar from "@/components/main/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import { Edit, MoreHorizontalIcon, ArchiveIcon, LayoutDashboardIcon, BrainCircuit, StarsIcon, ChevronDown, ArrowUp, Paperclip, BotIcon, Share } from "lucide-react";
import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const chatData = [
    { title: "Creating a custom 1" },
    { title: "new chat" },
    { title: "Lorem ipsum 4" },
    { title: "Creating 3" },
    { title: "Chat s" },
    { title: "Creating Lorem" },
];

const randomMessages = [
    { "role": "User", "imageSrc": "user_image_src", "content": "User message content 1" },
    { "role": "Bot", "imageSrc": "bot_image_src", "content": "Bot response content 1" },
    { "role": "User", "imageSrc": "user_image_src", "content": "User message content 2" },
    { "role": "Bot", "imageSrc": "bot_image_src", "content": "Bot response content 2" },
    { "role": "User", "imageSrc": "user_image_src", "content": "User message content 3" },
    { "role": "Bot", "imageSrc": "bot_image_src", "content": "Bot response content 3" },
    { "role": "User", "imageSrc": "user_image_src", "content": "User message content 4" },
    { "role": "Bot", "imageSrc": "bot_image_src", "content": "Bot response content 4" },
    { "role": "User", "imageSrc": "user_image_src", "content": "User message content 5" },
    { "role": "Bot", "imageSrc": "bot_image_src", "content": "Bot response content 5" },
    { "role": "User", "imageSrc": "user_image_src", "content": "User message content 6" },
    { "role": "Bot", "imageSrc": "bot_image_src", "content": "Bot response content 6" },
    { "role": "User", "imageSrc": "user_image_src", "content": "User message content 7" },
    { "role": "Bot", "imageSrc": "bot_image_src", "content": "Bot response content 7" },
    { "role": "User", "imageSrc": "user_image_src", "content": "User message content 8" }
]

export default function Page() {
    const { user } = useUser();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isSidebarOpened, setIsSidebarOpened] = useState(true);

    const autoResizeTextarea = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const minHeight = 0; // in px

        textarea.style.height = 'inherit';
        textarea.style.height = `${Math.max(textarea.scrollHeight - 26, minHeight)}px`;
        if (textarea.scrollHeight > 400) {
            textarea.style.overflowY = "auto";
        }
    };

    if (!user) return;

    return (
        <div className="flex flex-row h-screen max-h-screen bg-background-secondary">
            <div className={
                cn("hidden lg:flex flex-col min-w-[250px] max-w-[250px] pl-3 mr-2 bg-background chats-navbar transition-all",
                    isSidebarOpened ? "translate-x-0" : "-translate-x-[1000px]")
            }>
                <LeftBar />
            </div>
            {/* RIGHTSIDE */}
            <div className="max-h-screen w-full overflow-x-hidden overflow-y-auto bg-background-secondary flex justify-center relative chatGPT">
                {/* CLOSESIDEBAR */}
                <Button
                    variant="ghost"
                    className={`hidden p-2 ml-2 lg:flex fixed transition-all z-30 top-1/2 ${isSidebarOpened ? "left-[260px] sidebar-close-btn" : "left-0 sidebar-open-btn"} flex-col px-4 cursor-pointer`}
                    onClick={() => setIsSidebarOpened(!isSidebarOpened)}
                >
                    <div className="h-3 w-1 rounded-t-md bg-muted-foreground" />
                    <div className="h-3 w-1 rounded-b-md bg-muted-foreground" />
                </Button>
                {/* CLOSESIDEBAR End*/}
                <div className="fixed z-20 p-2 top-0 flex flex-row justify-between w-[calc(100%-10px)] lg:w-[calc(100vw-275px)] bg-background-secondary">
                    <div className="flex flex-row flex-nowrap gap-2 md:gap-6 lg:gap-0">
                        <div
                            tabIndex={1}
                            className="w-fit items-center flex py-2 px-3 justify-center chat-link flex-row flex-nowrap h-10 gap-2 hover:bg-muted-foreground/15 cursor-pointer rounded-md border-md"
                        >
                            <h2 className="text-lg font-medium inline-flex gap-1 items-center">
                                ChatGPT 4
                                <span>
                                    <ChevronDown className="text-muted-foreground" height={16} width={16} />
                                </span>
                            </h2>
                        </div>
                        {/* PHONE LEFT SHEET */}
                        <Sheet>
                            {/* BUGER MENU FOR PHONES */}
                            <SheetTrigger>
                                <div className="flex items-center lg:hidden">
                                    <button className="flex flex-col gap-1 hamburger w-fit h-fit p-2 rounded-md hover:bg-muted-foreground/30 bg-background">
                                        <div className="h-[3px] rounded-full w-6 bg-foreground" />
                                        <div className="h-[3px] rounded-full w-6 bg-foreground" />
                                        <div className="h-[3px] rounded-full w-4 bg-foreground" />
                                    </button>
                                </div>
                            </SheetTrigger>
                            {/* BUGER MENU FOR PHONES END */}
                            <SheetContent side="left">
                                <LeftBar />
                            </SheetContent>
                        </Sheet>
                        {/* PHONE LEFT SHEET END*/}
                    </div>
                    <div
                        tabIndex={1}
                        className="h-9 w-9 flex items-center justify-center mr-1 border rounded-lg cursor-pointer hover:bg-muted-foreground/30 bg-background"
                    >
                        <Share height={18} width={18} />
                    </div>
                </div>
                {/* CHAT MESSAGES */}
                <div className="px-4 py-20 w-full h-fit my-3 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
                    {randomMessages.map((message) => (
                        <Message
                            key={message.content}
                            role={message.role}
                            content={message.content}
                            imageSrc={user.imageUrl}
                        />
                    ))}
                </div>
                {/* CHAT MESSAGES END*/}
                {/* USER INPUT */}
                <div className="fixed bottom-0 w-[calc(100%-10px)] lg:w-[calc(100vw-275px)] z-20 bg-background-secondary">
                    <div className="flex flex-col items-center px-2">
                        <div className="w-full chats-navbar relative text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
                            <span
                                tabIndex={1}
                                className="absolute cursor-pointer bottom-[12px] left-2 md:left-9 p-0.5"
                            >
                                <Paperclip className="text-foreground" height={24} width={24} />
                            </span>
                            <textarea
                                ref={textareaRef}
                                placeholder="Write something.."
                                className="w-full chats overflow-hidden bg-transparent border border-muted-foreground/40 focus-visible:border-muted-foreground ring-0 outline-none py-[12px] flex max-h-[calc(100vh-50px)] resize-none text-lg px-10 md:px-14 rounded-2xl"
                                style={{ height: '54px' }} // Set the default height to 54px
                                onInput={autoResizeTextarea}
                            />
                            <span className="absolute hover:bg-foreground bg-muted-foreground/60 cursor-pointer bottom-[12px] right-2 md:right-9 border rounded-md p-0.5">
                                <ArrowUp className="text-background" height={24} width={24} />
                            </span>
                        </div>
                        <p className="text-muted-foreground text-center text-sm my-2">
                            ChatGPT can make mistakes. Consider checking important information.
                        </p>
                    </div>
                </div>
                {/* USER INPUT END  */}
            </div>
        </div>
    );
};

const Chat = ({ title }: { title: string }) => {
    return (
        <div
            tabIndex={1}
            className="chat-link flex flex-row flex-nowrap h-9 items-center pl-2 gap-2 hover:bg-muted-foreground/15 cursor-pointer rounded-md border-md"
        >
            <p className="truncate max-w-[150px] text-sm">{title}</p>
            {/* POPOVER */}
            <div className="chat-popover h-full px-2 items-center ml-auto flex-row flex opacity-0 gap-3">
                <MoreHorizontalIcon className="ml-auto text-muted-foreground" width={18} height={18} />
                <ArchiveIcon width={18} height={18} className="text-muted-foreground" />
            </div>
            {/* POPOVER END */}
        </div>
    );
};

const Message = ({ role, imageSrc, content }: { role: string, imageSrc?: string, content: string }) => {
    return (
        <div className="mb-3 flex flex-row flex-nowrap gap-4 items-start justify-start pb-9">
            <Avatar className="h-[24px] w-[24px] m-0.5">
                {role !== "Bot"
                    ? <AvatarImage src={imageSrc} />
                    : <BotIcon />
                }
            </Avatar>
            <div>
                <div className="font-semibold select-none">{role}</div>
                <div>{content}</div>
            </div>
        </div>
    );
};

const LeftBar = () => {

    const { user } = useUser();

    if (!user) return;

    return (
        <>
            <div className="h-full w-full max-h-[calc(100vh-150px)] lg:max-h-full overflow-y-auto overflow-x-hidden pr-2 relative chats">
                {/* LOGO */}
                <div className="sticky left-0 right-0 top-0 z-20 pt-3.5">
                    <div className="w-full h-full bg-background">
                        <div
                            tabIndex={1}
                            className="flex flex-row flex-nowrap bg-transparent h-10 items-center px-2 gap-2 hover:bg-muted-foreground/15 cursor-pointer rounded-md border-md"
                        >
                            <Cognitar height="28" width="28" />
                            <p className="text-sm">Cognitar</p>
                            <Edit className="ml-auto" height={16} width={16} />
                        </div>
                    </div>
                </div>
                {/* LOGO END */}

                {/* HORIZONTAL_LINE */}
                <div className="my-2 ml-2 h-px w-7 bg-gray-700" />
                {/* HORIZONTAL_LINE END*/}

                {/* SOME_LINK */}
                <div
                    tabIndex={1}
                    className="chat-link pl-2 flex flex-row flex-nowrap h-10 items-center gap-2 hover:bg-muted-foreground/15 cursor-pointer rounded-md border-md mt-3.5"
                >
                    <div className="w-5 h-5">
                        <LayoutDashboardIcon className="w-5 h-5" />
                    </div>
                    <p className="truncate max-w-[150px]">Explore GPTs</p>
                </div>
                {/* SOME_LINK END*/}

                {/* ANY CHATS */}
                <h3 className="mt-5 h-9 pb-2 pt-3 px-2 text-xs font-medium text-ellipsis text-muted-foreground">Your chats</h3>
                {chatData.map((chat) => (
                    <Chat
                        key={chat.title}
                        title={chat.title}
                    />
                ))}
                <h3 className="mt-5 h-9 pb-2 pt-3 px-2 text-xs font-medium text-ellipsis text-muted-foreground">Last 7 days</h3>
                {chatData.map((chat) => (
                    <Chat
                        key={chat.title}
                        title={chat.title}
                    />
                ))}
                <h3 className="mt-5 h-9 pb-2 pt-3 px-2 text-xs font-medium text-ellipsis text-muted-foreground">Last month</h3>
                {chatData.map((chat) => (
                    <Chat
                        key={chat.title}
                        title={chat.title}
                    />
                ))}
                {/* ANY CHATS END */}
            </div>
            {/* FOOTER */}
            <div className="flex flex-col py-2 h-fit">
                <div
                    className="flex flex-row flex-nowrap items-center h-[48px] pl-2 gap-2 hover:bg-muted-foreground/15 cursor-pointer rounded-md border-md"
                >
                    <div className="max-w-[32px] w-full h-full max-h-[32px] border rounded-full p-1">
                        <StarsIcon className="w-full h-full" />
                    </div>
                    <div className="h-fit w-full flex flex-col">
                        <p className="text-sm w-full truncate">Collaborate</p>
                        <p className="text-xs w-full truncate text-muted-foreground">Collaborate on a Team plan</p>
                    </div>
                </div>
                <div
                    className="flex flex-row flex-nowrap items-center h-[48px] pl-2 gap-2 hover:bg-muted-foreground/15 cursor-pointer rounded-md border-md"
                >
                    <Avatar className="w-[32px] h-[32px]">
                        <AvatarFallback>
                            {user.username ? user.username[0] : ""}
                        </AvatarFallback>
                    </Avatar>
                    <p className="text-sm w-full truncate">{user.username}</p>
                </div>
            </div>
            {/* FOOTER END */}
        </>
    );
}