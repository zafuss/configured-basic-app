import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ColorPicker, {
  HueSlider,
  Panel1,
  type ColorFormatsObject,
} from 'reanimated-color-picker';

export default function CreateTagScreen() {
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('#FF0000');
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  const handleColorChange = ({ hex }: ColorFormatsObject) => {
    setTagColor(hex);
  };

  const openColorPicker = () => {
    setIsColorPickerVisible(true);
  };

  const closeColorPicker = () => {
    setIsColorPickerVisible(false);
  };

  const handleCreateTag = () => {
    // chỗ này bạn gọi API / dispatch store
    console.log('Create tag:', { name: tagName, color: tagColor });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Tag</Text>

      {/* Tag name */}
      <Text style={styles.label}>Tag name</Text>
      <TextInput
        value={tagName}
        onChangeText={setTagName}
        placeholder="Enter tag name"
        style={styles.input}
      />

      {/* Color row */}
      <Text style={styles.label}>Color</Text>
      <View style={styles.colorRow}>
        <View style={[styles.colorPreview, { backgroundColor: tagColor }]} />
        <Text style={styles.colorText}>{tagColor}</Text>

        <TouchableOpacity style={styles.colorButton} onPress={openColorPicker}>
          <Text style={styles.colorButtonText}>Chọn màu</Text>
        </TouchableOpacity>
      </View>

      {/* Create button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateTag}>
        <Text style={styles.createButtonText}>Create</Text>
      </TouchableOpacity>

      {/* Color Picker Modal */}
      <Modal
        visible={isColorPickerVisible}
        transparent
        animationType="fade"
        onRequestClose={closeColorPicker}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn màu cho tag</Text>

            <ColorPicker
              value={tagColor}
              onChangeJS={handleColorChange}
              onCompleteJS={handleColorChange}
              boundedThumb // 👈 thêm dòng này
              thumbSize={24} // (tuỳ chọn) kích thước thumb
              sliderThickness={24} // (tuỳ chọn) độ dày slider
              style={styles.picker}
            >
              <Panel1 style={styles.panel} />

              <HueSlider
                style={styles.hueSlider}
                thumbStyle={styles.hueThumb}
              />
            </ColorPicker>

            <Text style={styles.selectedHex}>Màu: {tagColor}</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={closeColorPicker}
              >
                <Text style={styles.cancelText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // screen
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    marginBottom: 16,
  },

  // color row
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  colorPreview: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  colorText: {
    fontSize: 14,
    flex: 1,
  },
  colorButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  colorButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  // create button
  createButton: {
    marginTop: 'auto',
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  // modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalContent: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  picker: {
    width: '100%',
  },
  panel: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  hueSlider: {
    marginTop: 16,
    height: 24,
    borderRadius: 12,
  },
  hueThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  selectedHex: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 12,
  },
  modalButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#eee',
  },
  cancelText: {
    fontWeight: '600',
  },
});
