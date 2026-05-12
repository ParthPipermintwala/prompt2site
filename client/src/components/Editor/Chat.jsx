import React from 'react'

export default function Chat({conversations = []}) {
  return (
    <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
      {
        conversations.map((conversation, index) => (
          <div key={index} className={`flex ${conversation.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2.5 rounded-2xl text-sm  leading-relaxed ${conversation.role === "user" ? "bg-[#363636] text-zinc-300 text-right" : "border border-white/20 bg-[#2c2626] text-zinc-200 text-left"}`}>
              {conversation.content}
            </div>
          </div>
        ))
      }
    </div>
  )
}
