import { useEventStore } from '@/stores/EventStore'
import { CalendarIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'
import AllEventsOnDay from '../AllEventsOnDay'
import { useEffect, useState } from 'react'
import { Event } from '../../../global-types'

const UserCard = () => {
  const [mounted, setMounted] = useState(false)
  const [todayEventsCount, setTodayEventsCount] = useState(0)
  const [todayEvents, setTodayEvents] = useState<Event[]>([])

  const getTodayEvents = useEventStore((state) => state.getTodayEvents)

  useEffect(() => {
    setMounted(true)
    const events = getTodayEvents()
    setTodayEvents(events)
    setTodayEventsCount(events.length)
  }, [getTodayEvents])

  if (!mounted) {
    return <></>
  }

  return (
    <div className='ml-5 p-4 mr-4 h-20 bg-glass-effect flex items-center justify-between'>
      <div className='flex gap-4 items-center'>
        <div className='w-10 overflow-hidden h-10 rounded-full'>
          <Image
            src={'/myProfile.jpeg'}
            width={40}
            height={40}
            alt='profile picture'
          />
        </div>
        <div>
          <h2 className='text-white font-medium'>Lakshit Arora</h2>
          <p className='text-xs font-extralight'>Frontend Developer</p>
        </div>
      </div>
      {todayEventsCount > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <button className='relative'>
              <CalendarIcon className='h-10 w-10 rounded-full p-2 bg-glass-effect-black' />
              <div className='w-4 h-4 text-xs flex justify-center items-center -top-1 -right-1 absolute rounded-full bg-p-secondary text-neutral-800'>
                {todayEventsCount}
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent
            className='w-auto p-2 bg-white rounded-md shadow-md'
            align='start'
          >
            <AllEventsOnDay events={todayEvents} />
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

export default UserCard
