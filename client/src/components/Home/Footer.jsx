import React from 'react'

export default function Footer() {
  return (
   <footer className="border-t border-white/10 px-6 max-md:px-1 text-center text-sm text-zinc-500 flex align-baseline pt-3 justify-between">
        <div className="max-md:text[2px]">
          <p className="mb-2 text-zinc-400 max-md:px-0">
            &copy; 2026 prompt2site. All rights reserved.
          </p>

          <p className="mb-4 text-zinc-500 max-md:px-0">Made by Parth Pipermintwala</p>
        </div>

        <a
          href="https://github.com/ParthPipermintwala/prompt2site"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-md:text[2px] h-[50px] items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-blue-300 transition duration-300 ease-in-out hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200 max-md:px-2 max-md:py-1"
        >
          prompt2site GitHub
        </a>
      </footer>
  )
}
