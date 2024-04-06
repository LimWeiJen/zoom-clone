"use client"

import Meet from '@/components/Meet';
import React from 'react'

const MeetID = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <div>
      <Meet id={id} />
    </div>
  )
}

export default MeetID
