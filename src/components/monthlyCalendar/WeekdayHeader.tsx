import React, { memo } from 'react'
import { WEEKDAYS } from '../../data/constants'

const WeekdayHeader = memo(() => {
  return (
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
  )
})

WeekdayHeader.displayName = 'WeekdayHeader'

export default WeekdayHeader
