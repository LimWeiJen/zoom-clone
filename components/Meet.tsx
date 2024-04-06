"use client"

import { useUser } from '@clerk/nextjs'
import { StreamVideoClient, StreamVideo, StreamCall, StreamTheme, PaginatedGridLayout, CallControls, User } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const Meet = ({ id }: { id: any }) => {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn) return null;

  const [client] = useState<StreamVideoClient>(() => {
    const streamUser: User = {
      id: user.id,
      name: user.fullName!,
      image: user.imageUrl
    };
    return new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      user: streamUser,
      token: process.env.NEXT_PUBLIC_AUTH_TOKEN!,
      options: { logLevel: "warn" }
    })
  })

  const [call] = useState(() => client.call('default', id))

  useEffect(() => {
    call.join({ create: true }).catch(err => {
      console.error("Failed to join call", err)
    })
  }, [call]);

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <StreamTheme>
          <UI />
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  )
}

export const UI = () => {
  return (
    <>
      <PaginatedGridLayout />
      <CallControls />
    </>
  )
}

export default Meet
