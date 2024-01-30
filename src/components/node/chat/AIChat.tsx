"use client";
import { useRef } from "react";
import { useChat } from "ai/react";
import clsx from "clsx";
import { Bot, SendIcon, StopCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import CodeBlock from "@/components/node/chat/CodeBlock";
import { Message } from "ai";

const AIChat = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useUser();

  const { messages, input, setInput, handleSubmit, isLoading, stop } = useChat({
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
          `,
        id: "system",
      },
    ],
  });

  const disabled = isLoading || input.length === 0;

  return (
    <div className="flex flex-col items-center justify-between pb-40">
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
                className="prose mt-1 w-full break-words prose-p:leading-relaxed"
                remarkPlugins={[remarkGfm]}
                components={{
                  a: (props) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                  code: (props) => <CodeBlock {...props} />,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        )))}
      <div className="fixed w-full bottom-0 pt-16 flex flex-col items-center space-y-3 pb-4 sm:px-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
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
