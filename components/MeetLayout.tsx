import React from 'react'

import {
  StreamTheme,
  ParticipantView,
  useCallStateHooks,
  StreamVideoParticipant,
  SfuModels,
} from '@stream-io/video-react-sdk';


const MeetLayout = () => {
  const { useParticipants } = useCallStateHooks();
  const [...participant] = useParticipants();

  return (
    // enables the default styling for the video SDK
    <div>
      <h1 className='text-center absolute blur-sm z-[-1] opacity-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black'>BOOM</h1>
      <StreamTheme className='flex'>
        {participant.map((p) => (
          <ParticipantView
            key={p.userId}
            participant={p}
            className='flex flex-col justify-center items-center scale-75 mt-10'
            trackType={`${hasScreenShare(p) ? 'screenShareTrack' : 'videoTrack'}`}
          />
        ))}
      </StreamTheme>
    </div>
  );
}

const hasScreenShare = (p: StreamVideoParticipant) => p.publishedTracks.includes(SfuModels.TrackType.SCREEN_SHARE);

export default MeetLayout
