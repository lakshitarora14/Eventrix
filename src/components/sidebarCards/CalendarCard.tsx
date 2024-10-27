import { useState } from 'react'
import { Calendar } from '../Calendar'

const CalendarCard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className='ml-5 p-4 mt-6 mr-4 h-72 bg-glass-effect'>
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        type='sidebar'
        className='rounded-md'
      />
    </div>
  )
}

export default CalendarCard
