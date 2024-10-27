'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { cn } from '@/lib/utils'

const SIDEBAR_CLASSES = {
  today: `bg-purple-400/80 rounded-lg`,
  selected: `bg-purple-400/20 rounded-lg`,
  day: 'text-center h-8 w-8 font-extralight text-sm aria-selected:opacity-100',
  chevron: `fill-foreground p-1.5 text-sm font-lighter h-7 w-7 rounded-lg bg-black/40 mx-2`,
  root: 'w-full',
  month_grid: 'mt-8 w-full',
  caption: 'flex justify-center pt-1 relative items-center',
  caption_label: 'text-xl font-medium ml-3',
  nav: 'absolute right-1',
  outside: 'opacity-50',
  table: 'w-full',
  head_row: 'flex',
  weekday: 'text-sm font-extralight',
  head_cell: 'text-muted-foreground rounded-md font-extralight text-sm',
  row: 'flex w-full mt-2',
  day_today: 'bg-accent text-accent-foreground',
  day_disabled: 'text-muted-foreground opacity-50',
  day_range_middle:
    'aria-selected:bg-accent aria-selected:text-accent-foreground',
}

const FORM_CLASSES = {
  disabledDates: 'text-red opacity-50',
  selected: `text-foreground bg-black/90 rounded-lg`,
  day: 'text-center h-8 w-8 font-extralight text-sm aria-selected:opacity-100',
  chevron: `fill-foreground p-1 text-sm font-lighter h-6 w-6 rounded-lg bg-black/90 mx-2`,
  root: 'w-full text-gray-800',
  month_grid: 'mt-4 w-full',
  caption: 'flex justify-center pt-1 relative items-center',
  caption_label: 'text-md ml-3',
  nav: 'absolute right-1',
  outside: 'opacity-50',
  table: 'w-full',
  head_row: 'flex',
  weekday: 'text-sm font-extralight',
  head_cell: 'text-muted-foreground rounded-md font-extralight text-sm',
  row: 'flex w-full mt-2',
  day_disabled: 'text-muted-foreground opacity-50',
  day_range_middle:
    'aria-selected:bg-accent aria-selected:text-accent-foreground',
  today: `text-foreground bg-black/90 rounded-lg`,
}

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  type?: 'sidebar' | 'form'
  disablePrev?: boolean
}

const disabledDates = {
  before: new Date(),
}
function Calendar({
  type,
  className,
  classNames,
  showOutsideDays = true,
  disablePrev = false,
  ...props
}: CalendarProps) {
  const calendarStyleClasses =
    type === 'sidebar' ? SIDEBAR_CLASSES : FORM_CLASSES
  return (
    <DayPicker
      disabled={disablePrev && disabledDates}
      showOutsideDays={showOutsideDays}
      className={cn('', className)}
      classNames={{
        ...calendarStyleClasses,
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
