import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { Camera, CameraOff, Mic, MicOff, PhoneOff, ScreenShare, ScreenShareOff } from 'lucide-react';

const Controls = () => {
  const call = useCall();
  const { useMicrophoneState, useCameraState, useScreenShareState, useHasOngoingScreenShare } = useCallStateHooks();
  const { microphone, isMute: isMicrophoneMute } = useMicrophoneState();
  const { camera, isMute: isCameraMute } = useCameraState();
  const { screenShare, isMute: isScreenSharing } = useScreenShareState();
  const isSomeoneScreenSharing = useHasOngoingScreenShare();

  return (
    <div className='z-10 fixed bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full flex gap-2'>
      <Button variant="ghost" size="icon" className='rounded-full' onClick={() => microphone.toggle()}>
        {isMicrophoneMute ? <MicOff /> : <Mic />}
      </Button>
      <Button variant="ghost" size="icon" className='rounded-full' onClick={() => camera.toggle()}>
        {isCameraMute ? <CameraOff /> : <Camera />}
      </Button>
      <Button variant="ghost" className='rounded-full' disabled={!isScreenSharing && isSomeoneScreenSharing} size="icon" onClick={() => screenShare.toggle()}>
        {isScreenSharing ? <ScreenShare /> : <ScreenShareOff />}
      </Button>
      <Button variant="destructive" className='rounded-full' size="icon" onClick={() => {
        call?.leave();
        window.location.href = `/`
      }}><PhoneOff /></Button>
    </div>
  )
}

export default Controls
