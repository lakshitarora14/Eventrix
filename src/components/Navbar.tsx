'use client'
import { useEventStore } from '@/stores/EventStore'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'

const Navbar = () => {
  const goToPreviousMonth = useEventStore((state) => state.goToPreviousMonth)
  const goToNextMonth = useEventStore((state) => state.goToNextMonth)
  const setSelectedDate = useEventStore((state) => state.setSelectedDate)

  const today = new Date()
  return (
    <nav className='h-[8vh] md:h-[10vh] pt-2 flex items-center justify-between mx-8'>
      <div className='text-2xl md:text-3xl tracking-wide'>
        {format(today, 'MMMM, yyyy')}
      </div>
      <div className='flex gap-4'>
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
