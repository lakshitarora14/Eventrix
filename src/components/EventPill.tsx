import React, { useState } from 'react'
import { Event } from '../../global-types.d'
import { CATEGORY_COLORS } from '../data/constants'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'
import CreateEventForm from './CreateEventForm'
const EventPill = ({ event }: { event: Event }) => {
  const [createEventFormVisible, setCreateEventFormVisible] = useState(false)

  return (
    <Popover
      open={createEventFormVisible}
      onOpenChange={setCreateEventFormVisible}
    >
      <PopoverTrigger asChild>
        <button
          onClick={() => setCreateEventFormVisible(true)}
          key={event.id}
          style={{
            backgroundColor: CATEGORY_COLORS[event.category],
          }}
          className={`p-1 w-full text-neutral-700 font-light text-center text-xs sm:text-sm rounded`}
        >
          {event.startTime} - {event.title}
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <CreateEventForm
          handleClose={setCreateEventFormVisible}
          isEdit={true}
          existingEvent={event}
        />
      </PopoverContent>
    </Popover>
  )
}

export default EventPill
