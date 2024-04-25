'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { v4 } from 'uuid'

const Home = () => {
  const [meetingID, setmeetingID] = useState("")

  const createNewMeeting = () => {
    window.location.href = `/${v4()}`
  }

  const joinExistingMeeting = () => {
    window.location.href = `/${meetingID}`
  }

  return (
    <div>
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='flex flex-col w-full max-w-sm items-center space-x-2 my-8'>
          <h1 className='text-center w-full text-4xl font-bold'>BOOM</h1>
          <h1 className='text-center w-full font-light'>Zoom Clone</h1>
        </div>
        <div className='flex w-full max-w-sm items-center space-x-2'>
          <Input type="text" placeholder="Enter Meeting ID" onChange={(e) => setmeetingID(e.target.value)} />
          <Button onClick={joinExistingMeeting}>Join</Button>
        </div>
        <Separator className='my-8 w-96' />
        <div className='flex w-full max-w-sm items-center space-x-2'>
          <Button variant="secondary" className='w-full' onClick={createNewMeeting}>Create New Meeting</Button>
        </div>
      </div>
    </div>
  )
}

export default Home
