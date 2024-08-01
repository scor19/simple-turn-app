import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Controller } from 'react-hook-form';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../styles/Styles';

const DatePicker = ({ name, control, placeholder, errors, label }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date, onChange) => {
    const formatted = formatDate(date);
    setFormattedDate(formatted);
    onChange(formatted);
    hideDatePicker();
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hour = date.getHours().toString().padStart(2, '0');
    let minute = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hour}:${minute}`;
  };

  return (
    <View>
      <Text style={styles.textPlaceholder}>{label}</Text>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <View style={[styles.inputSingle, { paddingVertical: 10 }]}>
            <TouchableOpacity
              style={{ flexDirection: 'row', width: '100%' }}
              onPress={showDatePicker}
            >
              <AntDesign
                name="calendar"
                size={20}
                color="#50bb52"
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: '#A9A9A9' }}>
                {value || formattedDate || placeholder}
              </Text>
              <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={(date) => handleConfirm(date, onChange)}
                onCancel={hideDatePicker}
                minimumDate={new Date()}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      {errors[name] && (
        <Text style={styles.textError}>{errors[name]?.message}</Text>
      )}
    </View>
  );
};

export default DatePicker;
