"use client"

import { tokenForUser } from '@/lib/actions/stream.actions'
import { useUser } from '@clerk/nextjs'
import { StreamVideoClient, StreamVideo, StreamCall, StreamTheme, PaginatedGridLayout, CallControls, User, StreamVideoProvider, SpeakerLayout, LivestreamLayout, CallStats, CallPreview, CallParticipantsList, CallStatsButton, CallState, Call } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import Controls from './MeetControls'
import MeetLayout from './MeetLayout'

const Meet = ({ id }: { id: any }) => {
  const { isLoaded, isSignedIn, user } = useUser()
  const [call, setcall] = useState<Call>();
  const [client, setclient] = useState<StreamVideoClient>()

  useEffect(() => {

    if (isLoaded && isSignedIn) {
      let newClient = new StreamVideoClient({
        apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
        user: {
          id: user.id,
          name: user.fullName!,
          image: user.imageUrl
        },
        tokenProvider: tokenForUser,
        options: { logLevel: "warn" }
      })

      let newCall = newClient!.call('default', id)

      newCall!.join({ create: true }).catch(err => {
        console.error("Failed to join call", err)
      })

      setcall(newCall)
      setclient(newClient)
    }
  }, [isLoaded, isSignedIn, user])

  if (!client || !call) return null

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
