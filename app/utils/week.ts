// utils/week.ts
export const getMonday = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0: CN, 1: T2, ... 6: T7

  const diffToMonday = day === 0 ? -6 : 1 - day; // giải thích lúc nãy
  d.setDate(d.getDate() + diffToMonday);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getWeekDays = (monday: Date) => {
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(d);
  }
  return days;
};

export const formatDate = (date: Date) =>
  date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
  });

export const formatWeekdayShort = (date: Date) =>
  date.toLocaleDateString('vi-VN', {
    weekday: 'short',
  });

// Format time as HH:MM in 12-hour format with AM/PM
export const formatTime = (date: Date) =>
  date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
// utils/week.ts (thêm hàm này vào chung file với mấy hàm kia)
export const isSameDate = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
