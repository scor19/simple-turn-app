import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../styles/Styles';

const InputField = ({ name, control, label, placeholder, defaultValue = "", errors, icon }) => (
  <View>
    <Text style={styles.textPlaceholder}>{label}</Text>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <View style={styles.inputSingle}>
          <AntDesign name={icon} size={20} color="#50bb52" />
          <TextInput
            placeholder={placeholder}
            onChangeText={field.onChange}
            value={field.value}
          />
        </View>
      )}
    />
    {errors[name] && (
      <Text style={styles.textError}>{errors[name].message}</Text>
    )}
  </View>
);

export default InputField;