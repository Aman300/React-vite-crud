import React from 'react'

export default function Button({children, style, onClick}) {
  return (
    <button style={style} className='rounded-3xl bg-indigo-600 text-white px-10' onClick={onClick}>
    {children}
  </button>
  )
}
