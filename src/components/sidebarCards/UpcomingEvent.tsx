// import { useEventStore } from '@/stores/EventStore'
// import { ClockIcon } from '@heroicons/react/24/outline'
// // import { differenceInMinutes } from 'date-fns'
// import { useEffect, useState } from 'react'

// const UpcomingEvent = () => {
//   const [mounted, setMounted] = useState(false)
//   const getUpcomingEvent = useEventStore((state) => state.getUpcomingEvent)
//   const upcomingEvent = getUpcomingEvent()
//   console.log(upcomingEvent)
//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   if (!mounted) return null

//   if (!upcomingEvent) {
//     return (
//       <div className='flex flex-col justify-center items-center ml-5 mt-6 p-4 mr-4 h-40 bg-glass-effect'>
//         <span className='text-sm font-extralight'>No upcoming events</span>
//       </div>
//     )
//   }

//   return (
//     <div className='flex flex-col justify-between ml-5 mt-6 p-4 mr-4 h-40 bg-glass-effect'>
//       <div className='flex justify-between items-center'>
//         <span className='text-sm font-extralight'>
//           {upcomingEvent.startTime} - {upcomingEvent.endTime}
//         </span>
//         <span className='bg-glass-effect-black text-xs px-2 py-1 text-p-secondary flex items-center rounded-lg'>
//           <ClockIcon className='h-4 w-4 mr-2' />
//           {/* {durationInMinutes} min */}
//         </span>
//       </div>
//       <div className='font-medium text-xl w-full whitespace-normal overflow-hidden line-clamp-2'>
//         {upcomingEvent.title}
//       </div>
//       <div className='flex'>
//         <button
//           onClick={() => {}}
//           className='ml-2 rounded-lg border-none font-light px-4 py-1 text-black text-sm bg-p-secondary hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-purple-400/60'
//         >
//           Details
//         </button>
//       </div>
//     </div>
//   )
// }

// export default UpcomingEvent
