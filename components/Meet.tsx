"use client"

import { tokenForUser } from '@/lib/actions/stream.actions'
import { useUser } from '@clerk/nextjs'
import { StreamVideoClient, StreamVideo, StreamCall, StreamTheme, PaginatedGridLayout, CallControls, User, StreamVideoProvider, SpeakerLayout, LivestreamLayout, CallStats, CallPreview, CallParticipantsList, CallStatsButton, CallState } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import Controls from './MeetControls'
import MeetLayout from './MeetLayout'

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
      tokenProvider: tokenForUser,
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
      <StreamTheme>
        <StreamCall call={call}>
          <MeetLayout />
          <Controls />
        </StreamCall>
      </StreamTheme>
    </StreamVideo >
  )
}

export default Meet
