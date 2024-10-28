'use client'

import clsx from 'clsx'
import {
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
  subDays,
  addDays,
  format,
  getDay,
  isToday,
} from 'date-fns'
import { useMemo, useState, useEffect } from 'react'
import { WEEKDAYS } from '../../data/constants'
import { useEventStore } from '../../stores/EventStore'
import AddNewEventMobileView from '../AddNewEventMobileView'
import EventPill from '../EventPill'
import AllEventsOnDay from '../AllEventsOnDay'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'
import { Event } from '../../../global-types'
import EventPillMobile from '../EventPillMobile'

interface EventCalendarProps {
  currentDate: Date
}

const MonthlyCalendar = ({ currentDate }: EventCalendarProps) => {
  const eventsById = useEventStore((state) => state.eventsById)
  const eventsByDate = useEventStore((state) => state.eventsByDate)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const firstDayOfMonth = useMemo(
    () => startOfMonth(currentDate),
    [currentDate]
  )
  const lastDayOfMonth = useMemo(() => endOfMonth(currentDate), [currentDate])

  const calendarDays = useMemo(() => {
    const startingDayIndex = getDay(firstDayOfMonth)
    const leadingDays = Array.from({ length: startingDayIndex }).map((_, i) =>
      subDays(firstDayOfMonth, startingDayIndex - i)
    )
    const daysInMonth = eachDayOfInterval({
      start: firstDayOfMonth,
      end: lastDayOfMonth,
    })
    const totalDays = [...leadingDays, ...daysInMonth]
    const remainingSlots = 35 - totalDays.length
    const trailingDays = Array.from({
      length: remainingSlots > 0 ? remainingSlots : 0,
    }).map((_, i) => addDays(lastDayOfMonth, i + 1))

    return [...leadingDays, ...daysInMonth, ...trailingDays]
  }, [firstDayOfMonth, lastDayOfMonth])

  const convertTo24Hour = (timeStr: string) => {
    const [time, period] = timeStr.split(' ')
    const [hours, minutes] = time.split(':').map(Number)

    if (period === 'PM' && hours !== 12) {
      return `${hours + 12}:${minutes.toString().padStart(2, '0')}`
    }
    if (period === 'AM' && hours === 12) {
      return `00:${minutes.toString().padStart(2, '0')}`
    }
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`
  }

  const dayWiseEvents: Record<string, Event[]> = useMemo(() => {
    if (!isClient) return {}

    return Object.keys(eventsByDate).reduce((acc, dateKey) => {
      const eventIds = eventsByDate[dateKey]
      const sortedEvents = eventIds
        .map((id) => eventsById[id])
        .sort((a, b) => {
          const timeA = convertTo24Hour(a.startTime)
          const timeB = convertTo24Hour(b.startTime)
          return timeA.localeCompare(timeB)
        })
      return { ...acc, [dateKey]: sortedEvents }
    }, {})
  }, [eventsById, eventsByDate, isClient])

  return (
    <div className='md:px-4 py-2'>
      <div className='grid grid-cols-7 gap-1 px-4 h-[6vh]'>
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className='flex items-center justify-center h-10 bg-grey-bg text-center text-sm sm:text-base'
          >
            {day}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 grid-rows-5 gap-1 p-4 h-[73vh] md:h-[79vh]'>
        {calendarDays.map((day, index) => {
          const dateKey = format(day, 'yyyy-MM-dd')
          const todaysEvents = dayWiseEvents[dateKey] || []
          const isCurrentMonth = day >= firstDayOfMonth && day <= lastDayOfMonth
          const maxEventCountToShow = 4
          const showMore = todaysEvents.length > maxEventCountToShow

          return (
            <div
              key={index}
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
                    'text-foreground p-2 rounded-full bg-black/80':
                      isToday(day),
                    'text-neutral-500': !isToday(day),
                  }
                )}
              >
                {format(day, 'd')}
              </span>
              <div className='mt-2 block md:hidden space-y-1 max-h-[calc(100%-2rem)] overflow-scroll no-scrollbar'>
                {todaysEvents
                  .slice(0, maxEventCountToShow)
                  .map((event: Event) => (
                    <EventPillMobile key={event.id} event={event} />
                  ))}
              </div>
              <div className='mt-2 hidden md:block space-y-1 max-h-[calc(100%-2rem)] overflow-scroll no-scrollbar'>
                {todaysEvents
                  .slice(0, maxEventCountToShow)
                  .map((event: Event) => (
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
                    <AllEventsOnDay
                      day={format(day, 'd')}
                      events={todaysEvents}
                    />
                  </PopoverContent>
                </Popover>
              )}
            </div>
          )
        })}
      </div>
      <AddNewEventMobileView />
    </div>
  )
}

export default MonthlyCalendar
