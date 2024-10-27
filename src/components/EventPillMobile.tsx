import React, { useState } from 'react'
import { Event } from '../../global-types.d'
import { CATEGORY_COLORS } from '../data/constants'
import CreateEventForm from './CreateEventForm'
import { XMarkIcon } from '@heroicons/react/24/outline'
const EventPillMobile = ({ event }: { event: Event }) => {
  const [isCreateEventFormVisible, setCreateEventFormVisible] = useState(false)

  return (
    <>
      <button
        onClick={() => setCreateEventFormVisible(true)}
        key={event.id}
        style={{
          backgroundColor: CATEGORY_COLORS[event.category],
        }}
        className={`p-1 w-full text-neutral-700 font-light text-center text-xs sm:text-sm rounded`}
      >
        {event.title}
      </button>

      {isCreateEventFormVisible && (
        <div className='fixed inset-0 z-50 bg-white bg-opacity-50 flex items-center justify-center'>
          <button
            className='z-100 absolute top-6 right-4 text-neutral-800'
            onClick={() => setCreateEventFormVisible(false)}
          >
            <XMarkIcon className='h-8 w-8' />
          </button>
          <CreateEventForm
            handleClose={setCreateEventFormVisible}
            isEdit={true}
            existingEvent={event}
          />
        </div>
      )}
    </>
  )
}

export default EventPillMobile
