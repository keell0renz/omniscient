"use server"

import OpenAI from "openai";
import { Message, OpenAIStream, StreamingTextResponse } from "ai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function handler({ messages }: { messages: Message[] }) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: messages as any
    })

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
}