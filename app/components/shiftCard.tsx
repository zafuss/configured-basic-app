import { StyleSheet, View } from 'react-native';
import { Divider, MD3Theme, Text, useTheme } from 'react-native-paper';
import { Shift } from '../timeframe';
import { formatTime } from '../utils/week';

export default function ShiftCard(shift: Shift) {
  const theme = useTheme();
  const styles = cardStyles(theme);
  const timeString = formatTime(new Date(shift.startTime));
  const [time, period] = timeString.includes(' ')
    ? timeString.split(' ')
    : [
        timeString.replace(/([AP]M)$/i, ''),
        timeString.match(/([AP]M)$/i)?.[0] || '',
      ];

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text>{time}</Text>
        <Text>{period}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Divider style={styles.divider} />
        <View style={styles.shiftContent}>
          <Text variant="titleMedium">{shift.title}</Text>
          <Text variant="bodyMedium">
            {formatTime(new Date(shift.startTime))} -{' '}
            {formatTime(new Date(shift.endTime))}
          </Text>
        </View>
      </View>
    </View>
  );
}

const cardStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      flexDirection: 'row',
    },
    leftContainer: {
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
    },
    rightContainer: {
      marginLeft: 16,
      flex: 1,
      flexWrap: 'wrap',
    },
    divider: {
      width: '100%',
      paddingVertical: 0.5,
      marginVertical: 16,
    },
    shiftContent: {
      flexWrap: 'wrap',
      backgroundColor: theme.colors.surfaceVariant,
      padding: 8,
      borderRadius: 8,
    },
  });
