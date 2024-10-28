'use client'
import { useEventStore } from '@/stores/EventStore'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'
import CreateEventForm from './CreateEventForm'
import { useState } from 'react'

const Navbar = () => {
  const goToPreviousMonth = useEventStore((state) => state.goToPreviousMonth)
  const goToNextMonth = useEventStore((state) => state.goToNextMonth)
  const setSelectedDate = useEventStore((state) => state.setSelectedDate)
  const selectedDate = useEventStore((state) => state.selectedDate)
  const [createEventFormVisible, setCreateEventFormVisible] = useState(false)

  const today = new Date()
  return (
    <nav className='h-[8vh] md:h-[10vh] pt-2 flex items-center justify-between mx-8'>
      <div className='text-2xl md:text-3xl tracking-wide'>
        {format(selectedDate, 'MMMM, yyyy')}
      </div>
      <div className='flex gap-4'>
        <Popover
          open={createEventFormVisible}
          onOpenChange={setCreateEventFormVisible}
        >
          <PopoverTrigger asChild>
            <button
              onClick={() => setCreateEventFormVisible(true)}
              className='hidden md:flex items-center rounded-lg bg-gradient-to-br from-gray-900 to-black border-p-secondary font-light px-3 py-1 text-foreground text-sm hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-900 transition duration-300'
            >
              <PlusIcon className='h-4 w-4 mr-1' />
              Create
            </button>
          </PopoverTrigger>
          <PopoverContent className='relative'>
            <CreateEventForm handleClose={setCreateEventFormVisible} />
          </PopoverContent>
        </Popover>
        <button
          onClick={goToPreviousMonth}
          className='bg-grey-bg px-3 py-1 font-light text-sm rounded-lg text-neutral-900 hover:shadow-md  duration-300'
        >
          <ChevronLeftIcon className='h-4 w-4' />
        </button>
        <button
          onClick={() => setSelectedDate(today)}
          className='hidden md:block bg-grey-bg px-4 py-2 font-light text-sm rounded-lg text-neutral-900 hover:shadow-md  duration-300'
        >
          Today
        </button>
        <button
          onClick={goToNextMonth}
          className='bg-grey-bg px-3 py-1 font-light text-sm rounded-lg text-neutral-900 hover:shadow-md  duration-300'
        >
          <ChevronRightIcon className='h-4 w-4' />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
