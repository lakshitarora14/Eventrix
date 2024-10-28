'use client'
import React, { useState } from 'react'
import { Sidebar, SidebarBody } from './SidebarUI'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'
import {
  CalendarIcon,
  PlusCircleIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import UserCard from '../sidebarCards/UserCard'
import CalendarCard from '../sidebarCards/CalendarCard'
// import UpcomingEvent from '../sidebarCards/UpcomingEvent'
import Categories from '../sidebarCards/Categories'
import CreateEventForm from '../CreateEventForm'

export function SidebarWrapper() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const [createEventFormVisible, setCreateEventFormVisible] = useState(false)

  return (
    <Sidebar open={sidebarIsOpen} setOpen={setSidebarIsOpen}>
      <SidebarBody>
        <div
          className={`flex h-[10vh] mt-6 ${
            sidebarIsOpen ? 'flex-row justify-between' : 'flex-col'
          } items-center`}
        >
          <CalendarIcon
            className='h-10 w-10 hover:bg-purple-400/40 cursor-pointer ml-4 rounded-md p-1.5 transition-colors hover:bg-p-secondary/20'
            aria-label='Open calendar sidebar'
            onClick={() => setSidebarIsOpen(true)}
          />
          {sidebarIsOpen && (
            <>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='font-medium px-2 flex w-full items-center justify-between'
              >
                Eventrix
                <span className='flex items-center gap-4'>
                  <Popover
                    // open={createEventFormVisible}
                    onOpenChange={setCreateEventFormVisible}
                  >
                    <PopoverTrigger asChild>
                      <button
                        onClick={() => setCreateEventFormVisible(true)}
                        className='hidden md:flex items-center rounded-lg border border-p-secondary font-light px-3 py-1 text-p-secondary text-sm hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-purple-400/60'
                      >
                        <PlusIcon className='h-4 w-4 mr-1' />
                        Create
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className=''>
                      <CreateEventForm
                        handleClose={setCreateEventFormVisible}
                      />
                    </PopoverContent>
                  </Popover>
                  <XMarkIcon
                    className='h-10 w-10 mr-1 hover:bg-purple-400/40 cursor-pointer rounded-md p-1.5 transition-colors hover:bg-p-secondary/20'
                    aria-label='Close sidebar'
                    onClick={() => setSidebarIsOpen(false)}
                  />
                </span>
              </motion.span>
            </>
          )}
        </div>
        {!sidebarIsOpen && (
          <Popover
            open={createEventFormVisible}
            onOpenChange={setCreateEventFormVisible}
          >
            <PopoverTrigger asChild>
              <PlusCircleIcon
                onClick={() => setCreateEventFormVisible(true)}
                className='h-10 w-10 hover:bg-purple-400/40 cursor-pointer ml-4 rounded-md p-1.5 transition-colors hover:bg-p-secondary/20'
                aria-label='Open calendar sidebar'
              />
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <CreateEventForm handleClose={setCreateEventFormVisible} />
            </PopoverContent>
          </Popover>
        )}
        {sidebarIsOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='font-medium whitespace-pre'
          >
            <div className='h-[90vh] py-4 overflow-scroll no-scrollbar'>
              <UserCard />
              <CalendarCard />
              {/* <UpcomingEvent /> */}
              <Categories />
            </div>
          </motion.span>
        )}
      </SidebarBody>
    </Sidebar>
  )
}
