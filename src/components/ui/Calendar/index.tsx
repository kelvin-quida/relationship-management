'use client'
import React, { useState } from 'react'
import Button from '../Button'

interface CalendarProps {
  initialDateString: string
}

const Calendar: React.FC<CalendarProps> = ({ initialDateString }) => {
  const initialDate = new Date(initialDateString)
  const [currentDate, setCurrentDate] = useState(initialDate)

  const previousMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonth = prevDate.getMonth() - 1
      return new Date(prevDate.getFullYear(), prevMonth, 1)
    })
  }

  const nextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = prevDate.getMonth() + 1
      return new Date(prevDate.getFullYear(), nextMonth, 1)
    })
  }

  const getMonthName = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getDay()
    const blanks = Array(firstDayOfMonth).fill(null)
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    return (
      <div className="grid h-[300px] grid-cols-7 items-center justify-center gap-2">
        {blanks.map((_, index) => (
          <div key={`blank-${index}`} />
        ))}
        {days.map((day) => (
          <div
            key={`day-${day}`}
            className={`text-center ${
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear()
                ? 'text-green-500'
                : 'text-neutral-300'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Button color="neutral" onClick={previousMonth}>
          Previous
        </Button>
        <h2 className="font-bold text-neutral-100">
          {getMonthName(currentDate)}
        </h2>
        <Button color="neutral" onClick={nextMonth}>
          Next
        </Button>
      </div>
      {renderCalendar()}
    </div>
  )
}

export default Calendar
