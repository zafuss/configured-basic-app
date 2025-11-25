import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShiftCard from './components/shiftCard';
import WeekSwitcher from './components/weekSwitcher';

export default function TimeFrameScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    // In real app, fetch shifts from API or database
    onGetShift(selectedDate);
  }, [selectedDate]);

  const onGetShift = (selectedDate: Date | undefined) => {
    // Filter shifts for the selected date
    if (!selectedDate) return;
    const filteredShifts = dummyShifts.filter((shift) => {
      const shiftDate = new Date(shift.date);
      console.log(
        'Comparing shift date:',
        shiftDate,
        'with selected date:',
        selectedDate
      );
      return (
        shiftDate.getFullYear() === selectedDate.getFullYear() &&
        shiftDate.getMonth() === selectedDate.getMonth() &&
        shiftDate.getDate() === selectedDate.getDate()
      );
    });
    console.log('Filtered Shifts:', filteredShifts);
    setShifts(filteredShifts);
  };

  return (
    <SafeAreaView>
      <View>
        <WeekSwitcher
          initialDate={selectedDate}
          onDaySelect={setSelectedDate}
        ></WeekSwitcher>
      </View>
      <View>
        {shifts.map((shift) => (
          <View key={shift.id}>
            <ShiftCard {...shift} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

export interface Shift {
  id: string;
  date: number; // timestamp
  title: string;
  description?: string;
  category: string;
  startTime: number; // timestamp
  endTime: number; // timestamp
}

// Dummy shifts data
const dummyShifts: Shift[] = [
  {
    id: '1',
    date: new Date('2025-11-25').getTime(),
    title: 'Morning Shift',
    description: 'Start your day with a productive morning shift.',
    category: 'Work',
    startTime: new Date('2025-11-25T09:00:00').getTime(),
    endTime: new Date('2025-11-25T12:00:00').getTime(),
  },
  {
    id: '2',
    date: new Date('2025-11-25').getTime(),
    title: 'Afternoon Shift',
    description: 'Continue your day with an afternoon shift.',
    category: 'Work',
    startTime: new Date('2025-11-25T13:00:00').getTime(),
    endTime: new Date('2025-11-25T21:00:00').getTime(),
  },
  {
    id: '3',
    date: new Date('2025-11-26').getTime(),
    title: 'Morning Shift',
    category: 'Work',
    startTime: new Date('2025-11-26T08:00:00').getTime(),
    endTime: new Date('2025-11-26T16:00:00').getTime(),
  },
  {
    id: '4',
    date: new Date('2025-11-26').getTime(),
    title: 'Afternoon Shift',
    category: 'Work',
    startTime: new Date('2025-11-26T10:00:00').getTime(),
    endTime: new Date('2025-11-26T18:00:00').getTime(),
  },
];
