// filepath: /Users/zafus/Development/react_native/configured-basic-app/app/dialog.tsx
import * as React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const data = ['User 1', 'User 2', 'User 3', 'Object A', 'Object B']; // Dữ liệu mẫu

  const toggleSelection = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const applyFilter = () => {
    // Logic lọc danh sách chính dựa trên selectedItems
    console.log('Filtered by:', selectedItems);
    setVisible(false);
  };

  return (
    <SafeAreaView>
      <View>
        <Button onPress={() => setVisible(true)}>Show Filter List</Button>
        <Modal
          visible={visible}
          transparent
          onRequestClose={() => setVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.bottomSheet}>
              <Text variant="headlineSmall">Select Items to Filter</Text>
              <FlatList
                data={data}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => toggleSelection(item)}
                    style={styles.item}
                  >
                    <Text>
                      {item} {selectedItems.includes(item) ? '✓' : ''}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <Button onPress={applyFilter}>Apply Filter</Button>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: 'white',
    maxHeight: '50%',
  },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
});

export default MyComponent;
