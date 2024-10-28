'use client'

import { memo } from 'react'
import {
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
  subDays,
  addDays,
  format,
  getDay,
} from 'date-fns'
import { useMemo, useState, useEffect } from 'react'
import { useEventStore } from '../../stores/EventStore'
import AddNewEventMobileView from '../AddNewEventMobileView'
import { Event } from '../../../global-types'
import WeekdayHeader from './WeekdayHeader'
import CalendarDay from './CalendarDay'

type EventCalendarProps = {
  currentDate: Date
}

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
    const totalSlots = totalDays.length > 35 ? 42 : 35
    const remainingSlots = totalSlots - totalDays.length
    const trailingDays = Array.from({
      length: remainingSlots > 0 ? remainingSlots : 0,
    }).map((_, i) => addDays(lastDayOfMonth, i + 1))

    return [...leadingDays, ...daysInMonth, ...trailingDays]
  }, [firstDayOfMonth, lastDayOfMonth])

  const dayWiseEvents = useMemo(() => {
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
    }, {} as Record<string, Event[]>)
  }, [eventsById, eventsByDate, isClient])

  return (
    <div className='md:px-4 py-2'>
      <WeekdayHeader />
      <div
        className={`grid grid-cols-7 ${
          calendarDays.length > 35 ? 'grid-rows-6' : 'grid-rows-5'
        } gap-1 p-4 h-[73vh] md:h-[79vh]`}
      >
        {calendarDays.map((day) => {
          const dateKey = format(day, 'yyyy-MM-dd')
          const todaysEvents = dayWiseEvents[dateKey] || []
          const isCurrentMonth = day >= firstDayOfMonth && day <= lastDayOfMonth
          return (
            <CalendarDay
              key={dateKey}
              day={day}
              events={todaysEvents}
              isCurrentMonth={isCurrentMonth}
            />
          )
        })}
      </div>
      <AddNewEventMobileView />
    </div>
  )
}

export default memo(MonthlyCalendar)
