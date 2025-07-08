"use client"

import type React from "react"

import { useState } from "react"
import { Send, FileText, ExternalLink, Copy, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface Citation {
  text: string
  source: string
  link: string
  paragraph?: number
}

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  citations?: Citation[]
  timestamp: Date
}

// Using a public PDF for demonstration
const SIMULATED_RESPONSE = {
  answer:
    "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased's annual income should be added as future prospects.",
  citations: [
    {
      text: "as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.",
      source: "Dani_Devi_v_Pritam_Singh.pdf",
      link: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      paragraph: 7,
    },
  ],
}

const EXAMPLE_QUESTION =
  "In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time of death, is the claimant entitled to an addition towards future prospects in computing compensation under Section 166 of the Motor Vehicles Act, 1988?"

export default function LegalAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: SIMULATED_RESPONSE.answer,
        citations: SIMULATED_RESPONSE.citations,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
  }

  const openPdfInNewTab = (citation: Citation) => {
    const searchParam = encodeURIComponent(citation.text.substring(0, 30))
    const url = `${citation.link}#search=${searchParam}`
    window.open(url, "_blank")
  }

  const pasteExampleQuestion = () => {
    setInput(EXAMPLE_QUESTION)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Lexi Legal Assistant
              </h1>
              <p className="text-gray-600 text-sm">AI-powered legal research with verified citations</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Lexi</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Ask any legal question and get answers with verified citations
              </p>

              <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Copy className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-blue-900 mb-2">Try this example question:</h4>
                      <p className="text-blue-800 text-sm leading-relaxed">
                        "In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time
                        of death, is the claimant entitled to an addition towards future prospects in computing
                        compensation under Section 166 of the Motor Vehicles Act, 1988?"
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={pasteExampleQuestion}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Use This Example
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-3xl ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg"
                } rounded-2xl p-6`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                      message.type === "user"
                        ? "bg-white/20 text-white"
                        : "bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700"
                    }`}
                  >
                    {message.type === "user" ? "You" : "Lexi"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`${message.type === "user" ? "text-white" : "text-gray-900"} leading-relaxed text-base`}
                    >
                      {message.content}
                    </p>

                    {/* Citations */}
                    {message.citations && message.citations.length > 0 && (
                      <div className="mt-6 space-y-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-4 w-4 text-amber-600" />
                          </div>
                          <h4 className="text-sm font-semibold text-gray-700">Legal Citations</h4>
                        </div>
                        {message.citations.map((citation, index) => (
                          <Card
                            key={index}
                            className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-l-amber-400 shadow-md"
                          >
                            <CardContent className="p-5">
                              <blockquote className="text-sm text-gray-700 italic mb-4 pl-4 border-l-2 border-amber-200">
                                "{citation.text}"
                              </blockquote>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                                    {citation.source}
                                  </Badge>
                                  {citation.paragraph && (
                                    <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                                      Para {citation.paragraph}
                                    </Badge>
                                  )}
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => openPdfInNewTab(citation)}
                                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md"
                                >
                                  <ExternalLink className="h-3 w-3 mr-2" />
                                  Open PDF
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading Message */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-3xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700 flex items-center justify-center text-sm font-semibold">
                    Lexi
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-gray-600">Analyzing your legal question...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 p-6 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <div className="flex-1">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a legal question..."
                className="min-h-[60px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg rounded-xl h-[60px]"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-3 text-center">Press Enter to send, Shift + Enter for new line</p>
        </div>
      </div>
    </div>
  )
}
