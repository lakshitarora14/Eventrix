import { useEventStore } from '@/stores/EventStore'
import { Progress } from './ProgressBar'
import { useEffect, useState } from 'react'
const CATEGORIES = [
  { name: 'Personal', color: 'bg-yellow-300', count: 0 },
  { name: 'Reminders', color: 'bg-sky-300', count: 0 },
  { name: 'Health', color: 'bg-red-200', count: 0 },
  { name: 'Miscellaneous', color: 'bg-emerald-200', count: 0 },
  { name: 'Work', color: 'bg-purple-300', count: 0 },
]
const Categories = () => {
  const [mounted, setMounted] = useState(false)
  const [todayEventsCount, setTodayEventsCount] = useState(0)
  const [categories, setCategories] = useState(CATEGORIES)

  const getTodayEvents = useEventStore((state) => state.getTodayEvents)

  useEffect(() => {
    setMounted(true)
    const events = getTodayEvents()
    setTodayEventsCount(events.length)

    const updatedCategories = CATEGORIES.map((category) => {
      const count = events.filter(
        (event) => event.category === category.name
      ).length
      return { ...category, count }
    })
    setCategories(updatedCategories)
  }, [getTodayEvents])

  if (!mounted) {
    return <></>
  }

  return (
    <div className='flex flex-col justify-between ml-5 mt-6 p-4 mr-4 h-60 bg-glass-effect'>
      <div>Day Deck</div>
      <div className='space-y-4'>
        {categories.map((category) => (
          <div key={category.name} className='flex items-center gap-3'>
            <div className='flex items-center gap-2 w-28'>
              <div
                className={`w-3 h-3 rounded-full ${category.color}`}
                style={{ backgroundColor: category.color }}
              />
              <span className='text-white text-sm'>{category.name}</span>
            </div>
            <Progress
              value={(category.count / todayEventsCount) * 100}
              indicatorColor={category.color}
              style={
                {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                } as React.CSSProperties
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
