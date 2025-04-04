"use client"
import { useState } from 'react'
import { Announcement } from './Anouncement'


interface AnnouncementData {
  id: string
  message: string
}

export function Announcements() {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([
    { id: '1', message: "Welcome to our new website! We've got a fresh new look." },

  ])

  const closeAnnouncement = (id: string) => {
    setAnnouncements((prevAnnouncements) =>
      prevAnnouncements.filter((announcement) => announcement.id !== id)
    )
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 max-w-7xl mx-auto ">
      {announcements.map((announcement) => (
        <Announcement
          key={announcement.id}
          id={announcement.id}
          message={announcement.message}
          onClose={closeAnnouncement}
        />
      ))}
    </div>
  )
}

