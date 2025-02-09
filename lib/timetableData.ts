export type ClassType = 'lecture' | 'lab' | 'tutorial';

export interface Class {
  subject: string;
  type: ClassType;
  location: string;
}

export interface TimeSlot {
  time: string;
  monday?: Class;
  tuesday?: Class;
  wednesday?: Class;
  thursday?: Class;
  friday?: Class;
}

export const timetableData: TimeSlot[] = [
  {
    time: '09:00 - 10:30',
    monday: { subject: 'Mathematics', type: 'lecture', location: 'Hall A' },
    tuesday: { subject: 'Physics', type: 'lecture', location: 'Hall B' },
    wednesday: { subject: 'Chemistry', type: 'lab', location: 'Lab 1' },
    thursday: { subject: 'Computer Science', type: 'lecture', location: 'Hall C' },
    friday: { subject: 'Biology', type: 'lecture', location: 'Hall D' },
  },
  {
    time: '10:45 - 12:15',
    monday: { subject: 'Physics', type: 'lab', location: 'Lab 2' },
    tuesday: { subject: 'Mathematics', type: 'tutorial', location: 'Room 101' },
    wednesday: { subject: 'Computer Science', type: 'lab', location: 'Computer Lab' },
    thursday: { subject: 'Chemistry', type: 'lecture', location: 'Hall A' },
    friday: { subject: 'English Literature', type: 'lecture', location: 'Hall E' },
  },
  {
    time: '13:00 - 14:30',
    monday: { subject: 'Chemistry', type: 'tutorial', location: 'Room 102' },
    tuesday: { subject: 'Biology', type: 'lab', location: 'Lab 3' },
    wednesday: { subject: 'Mathematics', type: 'lecture', location: 'Hall B' },
    thursday: { subject: 'Physics', type: 'tutorial', location: 'Room 103' },
    friday: { subject: 'Computer Science', type: 'tutorial', location: 'Room 104' },
  },
  {
    time: '14:45 - 16:15',
    monday: { subject: 'English Literature', type: 'tutorial', location: 'Room 105' },
    tuesday: { subject: 'Computer Science', type: 'lecture', location: 'Hall C' },
    wednesday: { subject: 'Physics', type: 'lecture', location: 'Hall A' },
    thursday: { subject: 'Biology', type: 'tutorial', location: 'Room 106' },
    friday: { subject: 'Mathematics', type: 'lab', location: 'Math Lab' },
  },
  {
    time: '16:30 - 18:00',
    monday: { subject: 'Biology', type: 'lecture', location: 'Hall D' },
    wednesday: { subject: 'English Literature', type: 'lecture', location: 'Hall E' },
    friday: { subject: 'Chemistry', type: 'tutorial', location: 'Room 107' },
  },
];

