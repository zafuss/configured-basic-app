import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Chip, Divider, Menu, Provider, Text } from 'react-native-paper';

// ShiftStatus type đã có (không thay đổi)
export type ShiftStatus = 'SCHEDULED' | 'PENDING' | 'COMPLETED';

// Filter type bao gồm ALL
export type FilterOption = ShiftStatus | 'ALL';

// Define filter options (bao gồm ALL)
const FILTER_OPTIONS: FilterOption[] = [
  'ALL',
  'SCHEDULED',
  'PENDING',
  'COMPLETED',
];

// Mock data
interface Shift {
  id: string;
  title: string;
  status: ShiftStatus; // Sử dụng ShiftStatus type
}

const mockShifts: Shift[] = [
  { id: '1', title: 'Morning Shift', status: 'SCHEDULED' },
  { id: '2', title: 'Evening Shift', status: 'PENDING' },
  { id: '3', title: 'Night Shift', status: 'COMPLETED' },
  { id: '4', title: 'Weekend Shift', status: 'SCHEDULED' },
];

export default function ShiftListScreen() {
  const [visible, setVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('ALL');

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleFilterPress = (filter: FilterOption) => {
    setSelectedFilter(filter);
    closeMenu();
  };

  // Filter logic
  const filteredShifts =
    selectedFilter === 'ALL'
      ? mockShifts
      : mockShifts.filter((shift) => shift.status === selectedFilter);

  return (
    <Provider>
      <View style={styles.container}>
        {/* Filter Menu */}
        <View style={styles.filterContainer}>
          <Menu
            key={String(visible)}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Chip
                mode="outlined"
                onPress={openMenu}
                style={styles.filterChip}
              >
                Filter: {selectedFilter}
              </Chip>
            }
          >
            {/* Map từ FILTER_OPTIONS */}
            {FILTER_OPTIONS.map((option) => (
              <Menu.Item
                key={option}
                onPress={() => handleFilterPress(option)}
                title={option}
              />
            ))}
            <Divider />
          </Menu>
        </View>

        {/* Shift List */}
        <FlatList
          data={filteredShifts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.shiftItem}>
              <Chip
                mode="flat"
                style={[
                  styles.statusChip,
                  { backgroundColor: getStatusColor(item.status) },
                ]}
              >
                {item.status}
              </Chip>
              <View style={styles.shiftContent}>
                <Text variant="titleMedium">{item.title}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.list}
        />
      </View>
    </Provider>
  );
}

// Helper function cho status color
function getStatusColor(status: ShiftStatus): string {
  switch (status) {
    case 'SCHEDULED':
      return '#e3f2fd'; // Light blue
    case 'PENDING':
      return '#fff3e0'; // Light orange
    case 'COMPLETED':
      return '#e8f5e8'; // Light green
    default:
      return '#f5f5f5';
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  filterChip: {
    alignSelf: 'flex-start',
  },
  list: {
    padding: 16,
  },
  shiftItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusChip: {
    marginRight: 12,
  },
  shiftContent: {
    flex: 1,
  },
});
