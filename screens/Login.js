import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from '../styles/Styles';
import { AntDesign } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../services/FormValidation';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { saveEmail, signIn, resetEmail } from '../services/authService';

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);

  const navigation = useNavigation();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema), // Especifica el resolver para la validación de los inputs
  });

  const onSubmit = (data) => {
    // Funciones de authService.js
    saveEmail(data);
    signIn(data);
  };

  const handleResetPassword = async () => {
    const email = watch('email');
    if (!email) {
      Alert.alert('Error', 'Please enter your email first');
      return;
    }

    try {
      await resetEmail(email);
      Alert.alert('Success', 'Password reset email sent');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to send password reset email');
    }
  };

  return (
    <LinearGradient
      colors={['#A9DFBF', 'white']}
      style={styles.containerClear}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.2, y: 0.4 }}
    >
      <View style={[styles.containerClear, { justifyContent: 'center' }]}>
        <KeyboardAvoidingView behavior="padding">
          <Text
            style={[
              styles.textTitle,
              { textAlign: 'center', color: '#50bb52' },
            ]}
          >
            Welcome back
          </Text>
          <Text
            style={[
              styles.textTitleSub,
              { textAlign: 'center', marginBottom: 15 },
            ]}
          >
            We're happy to see you!
            {'\n'}
            Login to your account.
          </Text>
          <View>
            <Text style={styles.textPlaceholder}>Email</Text>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <View style={styles.inputSingle}>
                  <AntDesign
                    style={styles.iconLeft}
                    name="mail"
                    size={20}
                    color={'#50bb52'}
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={field.onChange}
                    value={field.value}
                    autoCapitalize="none"
                  />
                </View>
              )}
            />
            {errors.email && (
              <Text style={styles.textError}>{errors.email.message}</Text>
            )}
          </View>
          <View>
            <Text style={styles.textPlaceholder}>Password</Text>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <View style={styles.inputSingle}>
                  <AntDesign
                    name="lock"
                    size={20}
                    color={'#50bb52'}
                    style={styles.iconLeft}
                  />
                  <TextInput
                    style={styles.input}
                    secureTextEntry={showPassword ? true : false}
                    onChangeText={field.onChange}
                    value={field.value}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <AntDesign
                      name="eye"
                      size={20}
                      color={'#50bb52'}
                      style={styles.iconRight}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && (
              <Text style={styles.textError}>{errors.password.message}</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={handleResetPassword}>
              <Text style={[styles.textTitleSub, { color: 'gray' }]}>
                Forgotten password?{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonGroup, { marginTop: 10 }]}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={[
                styles.inputElevation,
                { backgroundColor: '#50bb52', padding: 10, borderRadius: 15 },
              ]}
            >
              <Text style={{ color: '#fff', alignSelf: 'center' }}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={[styles.textTitleSub, { color: 'gray' }]}>
              Don't have an account yet?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            >
              <Text
                style={[
                  styles.textTitleSub,
                  { color: '#50bb52', fontWeight: 'bold' },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </LinearGradient>
  );
};

export default Login;
