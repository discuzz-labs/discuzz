import React from 'react'

interface HeaderProps {
    content : string;
    caption? : string;
}

export default function Header({ 
    caption,
    content
} : HeaderProps ) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center pb-10">
    <p className="text-2xl font-extrabold">{content}</p>
    {caption ? <p className="text-sm font-thin">{caption}</p> : null}
  </div>
  )
}
