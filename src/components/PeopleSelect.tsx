// import { useState } from 'react'
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
// } from './Select'
// import Image from 'next/image'
// import { PROFILES } from '@/data/constants'

// const PeopleSelect = () => {
//   const [selectedPeople, setSelectedPeople] = useState([])

//   const toggleSelection = (id) => {
//     setSelectedPeople((prevSelected) =>
//       prevSelected.includes(id)
//         ? prevSelected.filter((selectedId) => selectedId !== id)
//         : [...prevSelected, id]
//     )
//   }

//   return (
//     <div className='w-full'>
//       <div className='flex items-center space-x-2'>
//         <Select>
//           <SelectTrigger className='w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center text-gray-500 bg-gray-100'>
//             +
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {PROFILES.map((person) => (
//                 <SelectItem
//                   key={person.id}
//                   value={person.name}
//                   onClick={() => toggleSelection(person.id)}
//                   className={
//                     selectedPeople.includes(person.id) ? 'bg-gray-300' : ''
//                   }
//                 >
//                   <div className='flex items-center'>
//                     <Image
//                       src={person.imgSrc}
//                       alt={person.name}
//                       width={40}
//                       height={40}
//                       className='w-8 h-8 rounded-full mr-2'
//                     />
//                     {person.name}
//                   </div>
//                 </SelectItem>
//               ))}
//             </SelectGroup>
//           </SelectContent>
//         </Select>

//         {selectedPeople.toString()}
//         {/* Display selected images */}
//         <div className='flex space-x-2'>
//           {selectedPeople.map((id) => {
//             const person = PROFILES.find((p) => p.id === id)
//             return (
//               <Image
//                 key={id}
//                 src={person.imgSrc}
//                 alt={person.name}
//                 width={40}
//                 height={40}
//                 className='w-10 h-10 rounded-full'
//               />
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PeopleSelect
