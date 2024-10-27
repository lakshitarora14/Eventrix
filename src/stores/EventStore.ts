import { create } from 'zustand'
import { format, addMonths, subMonths, parseISO } from 'date-fns'
import { Event } from '../../global-types'

type EventStore = {
  currentUser: string,
  selectedDate: Date,
  eventsById: Record<number, Event>,
  eventsByDate: Record<string, number[]>,
  addNewEvent: (event: Event) => void,
  deleteEvent: (id: number) => void,
  updateEvent: (event: Event) => void,
  goToNextMonth: () => void,
  goToPreviousMonth: () => void,
  setSelectedDate: (date: Date) => void,
  getTodayEvents: () => Event[]
}

const formatDateKey = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'yyyy-MM-dd')
}

const loadEventsFromLocalStorage = (): { eventsById: Record<number, Event>, eventsByDate: Record<string, number[]> } => {
  if (typeof window === 'undefined') return { eventsById: {}, eventsByDate: {} }

  try {
    const savedEventsById = localStorage.getItem('eventsById')
    const savedEventsByDate = localStorage.getItem('eventsByDate')
    return {
      eventsById: savedEventsById ? JSON.parse(savedEventsById) : {},
      eventsByDate: savedEventsByDate ? JSON.parse(savedEventsByDate) : {}
    }
  } catch (error) {
    console.error('Error loading events from localStorage:', error)
    return { eventsById: {}, eventsByDate: {} }
  }
}

const saveEventsToLocalStorage = (eventsById: Record<number, Event>, eventsByDate: Record<string, number[]>) => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem('eventsById', JSON.stringify(eventsById))
    localStorage.setItem('eventsByDate', JSON.stringify(eventsByDate))
  } catch (error) {
    console.error('Error saving events to localStorage:', error)
  }
}

export const useEventStore = create<EventStore>((set, get) => ({
  currentUser: 'Lakshit Arora',
  selectedDate: new Date(),
  ...loadEventsFromLocalStorage(),

  goToNextMonth: () => set((state) => ({
    selectedDate: addMonths(state.selectedDate, 1)
  })),

  goToPreviousMonth: () => set((state) => ({
    selectedDate: subMonths(state.selectedDate, 1)
  })),

  setSelectedDate: (date: Date) => set(() => ({
    selectedDate: date
  })),

  addNewEvent: (event: Event) => set((state) => {
    const dateKey = formatDateKey(event.date)

    const tempEventsById = { ...state.eventsById, [event.id]: event }
    const tempEventsByDate = {
      ...state.eventsByDate,
      [dateKey]: [...(state.eventsByDate[dateKey] || []), event.id]
    }

    saveEventsToLocalStorage(tempEventsById, tempEventsByDate)
    return { eventsById: tempEventsById, eventsByDate: tempEventsByDate }
  }),

  deleteEvent: (id: number) => set((state) => {
    const event = state.eventsById[id]
    if (!event) return state

    const dateKey = formatDateKey(event.date)
    const tempEventsById = { ...state.eventsById }
    delete tempEventsById[id]

    const tempEventsByDate = { ...state.eventsByDate }
    tempEventsByDate[dateKey] = tempEventsByDate[dateKey].filter(eventId => eventId !== id)
    if (tempEventsByDate[dateKey].length === 0) delete tempEventsByDate[dateKey]

    saveEventsToLocalStorage(tempEventsById, tempEventsByDate)
    return { eventsById: tempEventsById, eventsByDate: tempEventsByDate }
  }),

  updateEvent: (event: Event) => set((state) => {
    const oldEvent = state.eventsById[event.id]
    if (!oldEvent) return state

    const oldDateKey = formatDateKey(oldEvent.date)
    const newDateKey = formatDateKey(event.date)

    const tempEventsByDate = { ...state.eventsByDate }

    tempEventsByDate[oldDateKey] = (tempEventsByDate[oldDateKey] || [])
      .filter(id => id !== event.id)
    if (tempEventsByDate[oldDateKey].length === 0) {
      delete tempEventsByDate[oldDateKey]
    }

    if (!tempEventsByDate[newDateKey]) {
      tempEventsByDate[newDateKey] = []
    }
    if (!tempEventsByDate[newDateKey].includes(event.id)) {
      tempEventsByDate[newDateKey].push(event.id)
    }

    const tempEventsById = { ...state.eventsById, [event.id]: event }

    saveEventsToLocalStorage(tempEventsById, tempEventsByDate)
    return { eventsById: tempEventsById, eventsByDate: tempEventsByDate }
  }),


  getTodayEvents: () => {
    try {
      const { eventsById, eventsByDate } = get()
      const todayKey = formatDateKey(new Date())
      const todayEventIds = eventsByDate[todayKey] || []
      return todayEventIds
        .map(id => eventsById[id])
        .filter(Boolean)
        .sort((a, b) => {
          const dateA = typeof a.date === 'string' ? parseISO(a.date) : a.date
          const dateB = typeof b.date === 'string' ? parseISO(b.date) : b.date
          return dateA.getTime() - dateB.getTime()
        })
    } catch (error) {
      console.error('Error getting today events:', error)
      return []
    }
  }
}))