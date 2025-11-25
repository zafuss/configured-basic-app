// WeekSwitcher.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  formatDate,
  formatWeekdayShort,
  getMonday,
  getWeekDays,
  isSameDate,
} from '../utils/week';

type WeekSwitcherProps = {
  initialDate?: Date;
  onWeekChange?: (days: Date[]) => void;
  onDaySelect?: (day: Date) => void;
};

const WeekSwitcher: React.FC<WeekSwitcherProps> = ({
  initialDate = new Date(),
  onWeekChange,
  onDaySelect,
}) => {
  const [currentMonday, setCurrentMonday] = useState<Date>(() =>
    getMonday(initialDate)
  );

  // selectedDay: mặc định là hôm nay
  const [selectedDay, setSelectedDay] = useState<Date>(initialDate);

  const weekDays = useMemo(() => getWeekDays(currentMonday), [currentMonday]);

  useEffect(() => {
    onWeekChange?.(weekDays);
  }, [weekDays, onWeekChange]);

  const handlePrevWeek = () => {
    const d = new Date(currentMonday);
    d.setDate(currentMonday.getDate() - 7);
    setCurrentMonday(d);
  };

  const handleNextWeek = () => {
    const d = new Date(currentMonday);
    d.setDate(currentMonday.getDate() + 7);
    setCurrentMonday(d);
  };

  const handleSelectDay = (day: Date) => {
    setSelectedDay(day);
    onDaySelect?.(day);
  };

  const startText = formatDate(weekDays[0]);
  const endText = formatDate(weekDays[6]);

  return (
    <View style={styles.container}>
      {/* Header: nút back / next + range tuần */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handlePrevWeek} style={styles.navButton}>
          <Text style={styles.navButtonText}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={styles.weekText}>
          Tuần {startText} - {endText}
        </Text>

        <TouchableOpacity onPress={handleNextWeek} style={styles.navButton}>
          <Text style={styles.navButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* List 7 ngày trong tuần */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysRow}
      >
        {weekDays.map((d, idx) => {
          const isSelected = isSameDate(d, selectedDay);

          return (
            <TouchableOpacity
              key={idx}
              style={[styles.dayItem, isSelected && styles.dayItemSelected]}
              onPress={() => handleSelectDay(d)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.weekdayText,
                  isSelected && styles.weekdayTextSelected,
                ]}
              >
                {formatWeekdayShort(d)}
              </Text>
              <Text
                style={[styles.dateText, isSelected && styles.dateTextSelected]}
              >
                {formatDate(d)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default WeekSwitcher;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  weekText: {
    fontSize: 16,
    fontWeight: '600',
  },
  daysRow: {
    gap: 8,
  },
  dayItem: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dayItemSelected: {
    backgroundColor: '#007AFF11',
    borderColor: '#007AFF',
  },
  weekdayText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  weekdayTextSelected: {
    color: '#007AFF',
  },
  dateText: {
    fontSize: 14,
  },
  dateTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
