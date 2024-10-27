'use client'
import { useEventStore } from '@/stores/EventStore'
import MonthlyCalendar from './MonthlyCalendar'

const MonthlyCalendarView = () => {
  const selectedDate = useEventStore((state) => state.selectedDate)

  return (
    <div>
      <MonthlyCalendar currentDate={selectedDate} />
    </div>
  )
}

export default MonthlyCalendarView
