"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Mic,
  PlusCircle,
  Globe,
  LightbulbIcon,
  Code,
  PenTool,
  GraduationCap,
  FileText,
  MoreHorizontal,
} from "lucide-react"

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState("")

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">What can I help with?</h1>

        <div className="bg-zinc-900 rounded-2xl p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Input
              placeholder="Ask anything"
              className="bg-transparent border-none text-white placeholder:text-zinc-500 focus-visible:ring-0 text-lg"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full"
              >
                <PlusCircle className="h-5 w-5 mr-1" />
                Attach
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full"
              >
                <Globe className="h-5 w-5 mr-1" />
                Search
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full"
              >
                <LightbulbIcon className="h-5 w-5 mr-1" />
                Reason
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full"
            >
              <Mic className="h-5 w-5" />
              <span className="ml-1">Voice</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant="outline"
            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border-zinc-800"
          >
            <Code className="h-5 w-5 mr-2" />
            Code
          </Button>
          <Button
            variant="outline"
            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border-zinc-800"
          >
            <PenTool className="h-5 w-5 mr-2" />
            Help me write
          </Button>
          <Button
            variant="outline"
            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border-zinc-800"
          >
            <GraduationCap className="h-5 w-5 mr-2" />
            Get advice
          </Button>
          <Button
            variant="outline"
            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border-zinc-800"
          >
            <FileText className="h-5 w-5 mr-2" />
            Summarize text
          </Button>
          <Button
            variant="outline"
            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border-zinc-800"
          >
            <MoreHorizontal className="h-5 w-5" />
            More
          </Button>
        </div>
      </div>
    </div>
  )
}

