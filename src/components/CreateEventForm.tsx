'use client'
import { format, addMinutes, setMinutes, setSeconds } from 'date-fns'
import {
  CalendarIcon,
  ClockIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Calendar } from './Calendar'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'
import { zodResolver } from '@hookform/resolvers/zod'
import { TIME_OPTIONS } from '@/data/constants'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { Event } from '../../global-types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select'
import { useEventStore } from '@/stores/EventStore'

const CATEGORIES = [
  {
    name: 'Work',
    bgColor: 'bg-purple-100/80',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-800/40',
  },
  {
    name: 'Reminders',
    bgColor: 'bg-blue-100/80',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-800/40',
  },
  {
    name: 'Personal',
    bgColor: 'bg-yellow-100/80',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-800/40',
  },
  {
    name: 'Health',
    bgColor: 'bg-pink-100/80',
    textColor: 'text-pink-800',
    borderColor: 'border-pink-800/40',
  },
  {
    name: 'Miscellaneous',
    bgColor: 'bg-green-100/80',
    textColor: 'text-green-800',
    borderColor: 'border-green-800/40',
  },
]

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.date({ required_error: 'Date is required' }),
  startTime: z.string(),
  endTime: z.string(),
  category: z.string().min(1, 'Category is required'),
  participants: z.array(z.number()),
})

type FormFields = z.infer<typeof schema>

const floorToNearestHalfHour = (date: Date) => {
  const minutes = date.getMinutes()
  const flooredMinutes = minutes < 30 ? 0 : 30
  return setMinutes(setSeconds(date, 0), flooredMinutes)
}

const CreateEventForm = ({
  isEdit = false,
  existingEvent,
  handleClose,
}: {
  isEdit?: boolean
  existingEvent?: Event
  handleClose: (state: boolean) => void
}) => {
  const addNewEvent = useEventStore((state) => state.addNewEvent)
  const deleteEvent = useEventStore((state) => state.deleteEvent)
  const updateEvent = useEventStore((state) => state.updateEvent)
  const currentUser = useEventStore((state) => state.currentUser)

  const defaultStartTime = floorToNearestHalfHour(new Date())
  const defaultEndTime = addMinutes(defaultStartTime, 60)

  const [selectedCategory, setSelectedCategory] = useState(
    existingEvent?.category || ''
  )
  const [date, setDate] = useState<Date>(
    existingEvent?.date ? new Date(existingEvent.date) : new Date()
  )

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: '',
      date: date,
      startTime: format(defaultStartTime, 'hh:mm a'),
      endTime: format(defaultEndTime, 'hh:mm a'),
      participants: [],
    },
  })

  useEffect(() => {
    if (isEdit && existingEvent) {
      reset({
        title: existingEvent.title,
        date: new Date(existingEvent.date),
        startTime: existingEvent.startTime,
        endTime: existingEvent.endTime,
        category: existingEvent.category,
        participants: existingEvent.participants || [],
      })
      setSelectedCategory(existingEvent.category)
      setDate(new Date(existingEvent.date))
    }
  }, [isEdit, existingEvent, reset])

  const handleSelectCategory = (category: string) => {
    setValue('category', category)
    setSelectedCategory(category)
  }

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    data.participants = []
    if (isEdit && existingEvent) {
      updateEvent({
        ...data,
        id: existingEvent.id,
        organizer: existingEvent.organizer,
      })
      handleClose(false)
      return
    }

    addNewEvent({
      ...data,
      id: Date.now(),
      organizer: currentUser,
    })
    handleClose(false)
  }

  const deleteEventById = () => {
    if (existingEvent) {
      deleteEvent(existingEvent.id)
      handleClose(false)
    }
  }

  return (
    <div className='p-8 relative bg-white h-screen md:h-full md:w-[22rem] rounded-xl shadow-lg'>
      {isEdit && (
        <button
          onClick={() => deleteEventById()}
          className='absolute top-4 right-12'
        >
          <TrashIcon className='h-5 w-5 text-neutral-800' />
        </button>
      )}
      <button
        className='absolute top-4 right-4'
        onClick={() => handleClose(false)}
      >
        <XMarkIcon className='h-7 w-7 md:h-5 md:w-5 text-neutral-800' />
      </button>
      <form className='mt-10 md:mt-0' onSubmit={handleSubmit(onSubmit)}>
        <div className='h-16'>
          <input
            {...register('title')}
            type='text'
            className='w-full font-medium text-2xl text-gray-800 bg-transparent border-none focus:outline-none'
            placeholder='Add Title and Time'
          />
          {errors.title && (
            <p className='text-red-500/40 text-sm font-extralight'>
              {errors.title.message}
            </p>
          )}
        </div>

        <div className='flex items-center mb-6'>
          <CalendarIcon className='text-gray-700 h-6 w-6 mr-4' />
          <Popover>
            <PopoverTrigger asChild>
              <button className='bg-gray-100 font-light text-gray-800 rounded-md p-2 py-3 w-full focus:outline-none'>
                {format(date, 'PPP')}
              </button>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto p-2 bg-white rounded-md shadow-md'
              align='start'
            >
              <Calendar
                type='form'
                mode='single'
                selected={date}
                disablePrev={true}
                onSelect={(selectedDate) => {
                  if (selectedDate) {
                    setDate(selectedDate)
                    setValue('date', selectedDate)
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className='flex items-center mb-8 w-full'>
          <ClockIcon className='text-gray-700 h-6 w-6 mr-4' />
          <Select onValueChange={(value) => setValue('startTime', value)}>
            <SelectTrigger className='w-2/5 mr-5'>
              <SelectValue
                placeholder={
                  isEdit
                    ? existingEvent?.startTime
                    : format(defaultStartTime, 'hh:mm a')
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {TIME_OPTIONS.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.startTime && (
            <p className='text-red-500/40 text-sm font-extralight'>
              {errors.startTime.message}
            </p>
          )}

          <Select onValueChange={(value) => setValue('endTime', value)}>
            <SelectTrigger className='w-2/5'>
              <SelectValue
                placeholder={
                  isEdit
                    ? existingEvent?.endTime
                    : format(defaultEndTime, 'hh:mm a')
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {TIME_OPTIONS.map((time) => (
                  <SelectItem key={time} value={time} {...register('endTime')}>
                    {time}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.endTime && (
            <p className='text-red-500/40 text-sm font-extralight'>
              {errors.endTime.message}
            </p>
          )}
        </div>
        <div className='h-40'>
          <div className='flex flex-wrap w-[20rem] gap-2 tracking-wide'>
            {CATEGORIES.map((category) => (
              <span
                key={category.name}
                onClick={() => handleSelectCategory(category.name)}
                className={`px-4 py-3 rounded-lg text-sm font-light cursor-pointer
                  ${category.bgColor} ${category.textColor} border-2
                  ${
                    selectedCategory === category.name
                      ? category.borderColor
                      : 'border-transparent'
                  }`}
              >
                {category.name}
              </span>
            ))}
          </div>
          {errors.category && (
            <p className='text-red-500/40 mt-2 text-sm font-extralight'>
              {errors.category.message}
            </p>
          )}
        </div>
        <div className='flex justify-between items-center'>
          <button
            type='submit'
            className='w-full bg-black text-white py-3 px-4 rounded-md shadow-md hover:bg-neutral-800'
          >
            {isEdit ? 'Update Event' : 'Add Event'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateEventForm
