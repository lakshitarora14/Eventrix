import { Event } from '../../global-types'
import EventPill from './EventPill'
const AllEventsOnDay = ({ day, events }: { day?: string; events: Event[] }) => {
  return (
    <div className=' flex flex-col items-center w-[12rem] h-[16rem] mt-2 space-y-2  overflow-scroll no-scrollbar'>
      {day && (
        <div className='rounded-full mb-3 py-2 inline-flex items-center justify-center h-10 w-10 text-xl bg-black/90 items-centerle-400 text-foreground'>
          {day}
        </div>
      )}
      {events.map((event: Event) => (
        <EventPill key={event.id} event={event} />
      ))}
    </div>
  )
}

export default AllEventsOnDay
