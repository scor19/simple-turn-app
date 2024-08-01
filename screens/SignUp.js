import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../styles/Styles';
import { FIREBASE_AUTH } from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../services/FormValidation';
import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(true);

  const auth = FIREBASE_AUTH;

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema), // Especifica el resolver para la validación de los inputs
  });

  const onSubmit = (data) => {
    register(data);
  };

  const register = async (data) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(res);
      Alert.alert('Account was created!', 'You can sign in now', [
        { text: 'OK', onPress: () => navigation.replace('Login') },
      ]);
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Sign up failed:', 'Please enter a valid email');
      } else if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Sign up failed:', 'Email already in use');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert(
          'Sign up failed:',
          'Password is too weak, enter at least 6 characters'
        );
      }
    }
    FIREBASE_AUTH.signOut();
  };

  return (
    <LinearGradient
      colors={['#A9DFBF', 'white']}
      style={styles.containerClear}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0.4 }}
    >
      <View style={[styles.containerClear, { justifyContent: 'center' }]}>
        <KeyboardAvoidingView behavior="padding">
          <Text
            style={[
              styles.textTitle,
              { textAlign: 'center', color: '#50bb52' },
            ]}
          >
            Register
          </Text>
          <Text
            style={[
              styles.textTitleSub,
              { textAlign: 'center', marginBottom: 15 },
            ]}
          >
            We're happy to see you!
            {'\n'}
            Create your account.
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
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={[
                styles.inputElevation,
                { backgroundColor: '#50bb52', padding: 10, borderRadius: 15 },
              ]}
            >
              <Text style={{ color: '#fff', alignSelf: 'center' }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={[styles.textTitleSub, { color: 'gray' }]}>
              Have an account already?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.replace('Login');
              }}
            >
              <Text
                style={[
                  styles.textTitleSub,
                  { color: '#50bb52', fontWeight: 'bold' },
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </LinearGradient>
  );
};

export default SignUp;
