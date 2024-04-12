import Meet from '@/components/Meet'
import React from 'react'

const MeetingRoom = ({ params }: any) => {
  return (
    <div>
      <Meet id={params.id} />
    </div>
  )
}

export default MeetingRoom
