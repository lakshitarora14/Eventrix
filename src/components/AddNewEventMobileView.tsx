'use client'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import CreateEventForm from './CreateEventForm'
const AddNewEventMobileView = () => {
  const [isCreateEventFormVisible, setCreateEventFormVisible] = useState(false)

  return (
    <>
      <button
        className='md:hidden absolute shadow-lg bg-white rounded-full right-8 bottom-8'
        onClick={() => setCreateEventFormVisible(true)}
      >
        <PlusIcon className='h-10 w-10 p-2' />
      </button>

      {isCreateEventFormVisible && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center'>
          <button
            className='z-100 absolute top-4 right-4 text-neutral-800'
            onClick={() => setCreateEventFormVisible(false)}
          >
            <XMarkIcon className='h-10 w-10' />
          </button>
          <CreateEventForm handleClose={setCreateEventFormVisible} />
        </div>
      )}
    </>
  )
}

export default AddNewEventMobileView
