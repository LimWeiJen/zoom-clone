import React from 'react'

import {
  StreamTheme,
  ParticipantView,
  useCall,
  useCallStateHooks,
  StreamVideoParticipant,
  SfuModels,
} from '@stream-io/video-react-sdk';


const MeetLayout = () => {
  const call = useCall();
  const { useParticipants } = useCallStateHooks();
  const [...participant] = useParticipants();

  return (
    // enables the default styling for the video SDK
    <div>
      <StreamTheme className='flex'>
        {participant.map((p) => (
          <ParticipantView key={p.userId}
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
