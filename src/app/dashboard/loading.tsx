import { Loader2 } from 'lucide-react'
import React from 'react'

function Loading() {
  return (
    <div className='h-screen flex items-center'>
      <Loader2 className='animate-spin h-10 w-10 mx-auto text-gray-500'/>
    </div>
  )
}

export default Loading