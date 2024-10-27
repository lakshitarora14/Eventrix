// import { format } from 'date-fns'
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from './Select'
// import { TIME_OPTIONS } from '@/data/constants'

// const TimeDropdown = ({
//   error,
//   isEdit,
//   defaultStartTime,
//   existingEventStartTime,
//   setValue,
// }) => {
//   return (
//     <>
//       <Select onValueChange={(value) => setValue('startTime', value)}>
//         <SelectTrigger className='w-2/5 mr-5'>
//           <SelectValue
//             placeholder={
//               isEdit
//                 ? existingEventStartTime
//                 : format(defaultStartTime, 'hh:mm a')
//             }
//           />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             {TIME_OPTIONS.map((time) => (
//               <SelectItem key={time} value={time}>
//                 {time}
//               </SelectItem>
//             ))}
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//       {error && (
//         <p className='text-red-500/40 text-sm font-extralight'>
//           {error.message}
//         </p>
//       )}
//     </>
//   )
// }

// export default TimeDropdown
