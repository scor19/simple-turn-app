import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { styles } from '../styles/Styles';
import { AntDesign } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../services/FormValidation';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { saveEmail, signIn, resetEmail } from '../services/authService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false); // Estado para controlar el ActivityIndicator

  const navigation = useNavigation();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema), // Especifica el resolver para la validación de los inputs
  });

  const onSubmit = async (data) => {
    setLoading(true); // Inicia el indicador de carga
    try {
      await saveEmail(data);
      await signIn(data);
      setLoading(false); // Finaliza el indicador de carga cuando el login se completa
    } catch (error) {
      setLoading(false); // En caso de error, también detén el indicador de carga
      console.log(error);
      Alert.alert('Error', 'Login failed, please try again');
    }
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
      <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
    <LinearGradient
      colors={['#A9DFBF', 'white']}
      style={styles.containerClear}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.2, y: 0.4 }}
    >
        <View style={[styles.containerClear, { justifyContent: 'center' }]}>
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

            {/* Indicador de actividad */}
            {loading ? (
              <ActivityIndicator size="large" color="#50bb52" />
            ) : (
              <View style={[styles.buttonGroup, { marginTop: 10 }]}>
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  style={[
                    styles.inputElevation,
                    {
                      backgroundColor: '#50bb52',
                      padding: 10,
                      borderRadius: 15,
                    },
                  ]}
                  disabled={loading} // Desactiva el botón si está cargando
                >
                  <Text style={{ color: '#fff', alignSelf: 'center' }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            )}

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

        </View>
    </LinearGradient>
      </KeyboardAwareScrollView>
  );
};

export default Login;
