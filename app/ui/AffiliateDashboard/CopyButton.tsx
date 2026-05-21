"use client"
import { Check, Copy } from 'lucide-react'
import React, { useState } from 'react'

export default function CopyButton({textToCopy}:any) {
    const [isCopied, setIsCopied] = useState(false)
  
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(textToCopy)
        setIsCopied(true)
        
        setTimeout(() => {
          setIsCopied(false)
        }, 2000)
      } catch (err) {
        console.error('Failed to copy text:', err)
      }
    }
  
    return (
      <button
        onClick={handleCopy}
        className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
          isCopied ? 'bg-green-500' : 'bg-red-500'
        } text-white`}
      >
        {isCopied ? (
          <>
            <Check size={16} />
            Copied!
          </>
        ) : (
          <>
            <Copy size={16} />
            Copy URL
          </>
        )}
      </button>
    )
}
