export type Event = {
  id: number,
  title: string,
  date: Date,
  startTime: string,
  endTime: string,
  category: string,
  participants: number[],
  organizer?: string,
  conflictIds?: number[]
}