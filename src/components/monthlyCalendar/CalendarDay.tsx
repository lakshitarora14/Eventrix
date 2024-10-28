import React, { memo } from 'react'
import EventPillMobile from '../EventPillMobile'
import EventPill from '../EventPill'
import { format, isToday } from 'date-fns'
import clsx from 'clsx'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'
import AllEventsOnDay from '../AllEventsOnDay'
import { Event } from '../../../global-types'
type CalendarDayProps = {
  day: Date
  events: Event[]
  isCurrentMonth: boolean
}

const CalendarDay = memo(
  ({ day, events, isCurrentMonth }: CalendarDayProps) => {
    const maxEventCountToShow = 4
    const showMore = events.length > maxEventCountToShow

    return (
      <div
        className={clsx(
          'border-grey-bg relative group rounded-lg border-[0.5px] p-2 text-end',
          {
            'bg-white': isCurrentMonth,
            'bg-gray-100 border-gray-300 border-[0.5px] text-gray-400 opacity-70':
              !isCurrentMonth,
          }
        )}
      >
        <span
          className={clsx(
            'text-xs md:text-sm inline-flex items-center justify-center h-6 w-6',
            {
              'text-foreground p-2 rounded-full bg-black/80': isToday(day),
              'text-neutral-500': !isToday(day),
            }
          )}
        >
          {format(day, 'd')}
        </span>

        <div className='mt-2 block md:hidden space-y-1 max-h-[calc(100%-2rem)] overflow-scroll no-scrollbar'>
          {events.slice(0, maxEventCountToShow).map((event: Event) => (
            <EventPillMobile key={event.id} event={event} />
          ))}
        </div>

        <div className='mt-2 hidden md:block space-y-1 max-h-[calc(100%-2rem)] overflow-scroll no-scrollbar'>
          {events.slice(0, maxEventCountToShow).map((event: Event) => (
            <EventPill key={event.id} event={event} />
          ))}
        </div>

        {showMore && (
          <Popover>
            <PopoverTrigger asChild>
              <button className='opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out text-xs absolute bottom-2 right-1/2 translate-x-1/2 bg-white px-2 py-1 rounded-full shadow-lg mt-1'>
                Show more
              </button>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto p-2 bg-white rounded-md shadow-md'
              align='start'
            >
              <AllEventsOnDay day={format(day, 'd')} events={events} />
            </PopoverContent>
          </Popover>
        )}
      </div>
    )
  }
)

CalendarDay.displayName = 'CalendarDay'

export default CalendarDay
