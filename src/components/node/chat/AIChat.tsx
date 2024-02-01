"use client";
import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import clsx from "clsx";
import { ArrowBigDownDashIcon, Bot, SendIcon, StopCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import CodeBlock from "@/components/node/chat/CodeBlock";
import { Node } from "@prisma/client";
import { createChat, insertMessageIntoChat } from "@/server/chats";
import { Message as MessageSchema } from "ai"
import useChatStore from "@/store/ChatStore";
import { v4 as uuid } from "uuid";
import Cognitar from "@/components/misc/Logo";

const AIChat = ({ node }: { node: Node }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useUser();
  const { currentChat, setCurrentChat, chatMessages } = useChatStore();

  const { messages, input, setInput, handleSubmit, isLoading, stop, setMessages } = useChat({
    initialMessages: [
      {
        role: "system",
        content:
          `You are a chatbot inside Omniscient Ed-Tech AI self-learning platform developer by Cognitar.
           Your role is to teach user using the context provided by the platform. The platform consists of
           learning projects -- flexible learning environments developer and shared by community and experts,
           which contain roadmaps (study pathway mind-maps) and chats with context set by project creator.

           Please USE markdown syntax to hightlight and structure your writing! YOU MUST make spaces,
           make titles bold, use headers. Please.

           TITLE (lesson is about): ${node.title}
           DESCRIPTION (for humans): ${node.about} 
           CONTEXT (instructions for you, you MUST follow them): ${node.ai_context}
          `,
        id: "system",
      },
    ],
    onFinish: (message) => {
      saveMessagesToDatabase(message)
    }
  });

  const [firstUserMessage, setFirstUserMessage] = useState<MessageSchema | null>(null);
  const [firstBotMessage, setFirstBotMessage] = useState<MessageSchema | null>(null);

  useEffect(() => {
    console.log(chatMessages)
    if (chatMessages) {
      setMessages(chatMessages);
    }
  }, [currentChat?.id, chatMessages])


  async function saveMessagesToDatabase(message: MessageSchema) {

    const newUserMessage: MessageSchema = {
      id: uuid(),
      role: "user",
      content: input,
    };

    const newBotMessage: MessageSchema = {
      id: message.id,
      role: message.role,
      content: message.content,
    };

    if (currentChat?.id) {
      if (firstBotMessage && firstUserMessage) {
        insertMessageIntoChat(
          firstUserMessage,
          node.project_id,
          node.id,
          currentChat.id,
        );

        insertMessageIntoChat(
          firstBotMessage,
          node.project_id,
          node.id,
          currentChat.id,
        );
      }
      insertMessageIntoChat(
        newUserMessage,
        node.project_id,
        node.id,
        currentChat.id,
      );

      insertMessageIntoChat(
        newBotMessage,
        node.project_id,
        node.id,
        currentChat.id,
      );
    } else {
      setFirstBotMessage(newBotMessage);
      setFirstUserMessage(newUserMessage);
    }
  }

  const disabled = isLoading || input.length === 0;

  const [isScrolledDown, setIsScrolledDown] = useState(true);

  useEffect(() => {
    const chatParent = document.getElementById('chatParent');

    if (!chatParent) {
      console.error('Parent element with id "chatParent" not found.');
      return;
    }

    const handleScroll = () => {
      const isScrolled = chatParent.scrollTop + 300 < chatParent.scrollHeight - chatParent.clientHeight;

      setIsScrolledDown(isScrolled)
    };

    chatParent.addEventListener('scroll', handleScroll);

    return () => {
      chatParent.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollDown = () => {
    const chatParent = document.getElementById('chatParent');
    if (chatParent) {
      chatParent.scrollTo({
        top: chatParent.scrollHeight,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-between pb-40">
      {messages.length <= 1 &&
        <div className="flex flex-col justify-center mt-[20vh] items-center gap-8">
          <Cognitar height="169" width="169" />
          <h1 className="font-semibold text-xl">What you would like to learn today?</h1>
        </div>
      }
      {messages.length > 0 &&
        messages.map((message, i) => (
          message.role !== "system" && (
            <div
              key={i}
              className="flex w-full items-center justify-center py-8 bg-transparent"
            >
              <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
                <div
                  className={clsx(
                    "p-1.5 text-foreground rounded-full",
                    message.role === "assistant" ? "bg-blue-600 m-1.5" : "",
                  )}
                >
                  {message.role === "user" ? (
                    <Avatar>
                      <AvatarImage src={user?.imageUrl} />
                      <AvatarFallback delayMs={600}>
                        {user?.firstName![0]}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Bot height={28} width={28} className="text-white" />
                  )}
                </div>
                <ReactMarkdown
                  className="prose mt-1 break-words prose-p:leading-relaxed code-markdown w-[85%]"
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: (props) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                    p: (props) => (
                      <p className="my-5">
                        {props.children}
                      </p>
                    ),
                    code: (props) => <CodeBlock {...props} />,
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          )))}
      <div className="fixed w-full max-w-screen-md bottom-0 pt-16 flex flex-col items-center space-y-3 pb-4 sm:px-0 z-0">
        <ArrowBigDownDashIcon
          className={`text-foreground h-8 w-8 bg-blue-600 active:bg-blue-800 rounded-full cursor-pointer ${messages.length > 8 && isScrolledDown ? "" : "hidden"}`}
          onClick={() => handleScrollDown()}
        />
        <form
          ref={formRef}
          onSubmit={(e) => {
            handleSubmit(e);
            if (messages.length <= 1 && currentChat === null) {
              createChat(node.project_id, node.id).then((data) => setCurrentChat(data));
            }
          }}
          className="h-full bg-background w-full rounded-full relative max-w-screen-md border bg-none px-4 shadow-lg shadow-blue-600/10"
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            required
            autoFocus
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                stop();
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className="max-h-10 rounded-full pt-4 pb-0 scrollbar-hide bg-background m-0 w-full h-fit text-md resize-none border-0 pr-10 focus:ring-0 focus-visible:ring-0"
          />
          {isLoading ? (
            <button
              className="absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md border"
              onClick={(e) => {
                e.preventDefault();
                stop();
              }}
            >
              <StopCircle className="h-5 w-5" />
            </button>
          ) : (
            <button
              className={clsx(
                "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all",
                disabled
                  ? "cursor-not-allowed bg-background"
                  : "bg-blue-500 hover:bg-blue-600",
              )}
              disabled={disabled}
            >
              <SendIcon className="h-5 w-5 text-foreground" />
            </button>
          )}
        </form>
        <p className="text-xs text-muted-foreground !m-0.5 p-1">
          This is a first prototype of Omniscient system! Be aware of bugs! We
          are working on them :)
        </p>
      </div>
    </div>
  );
};

export default AIChat;
