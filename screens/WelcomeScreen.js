import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { styles } from '../styles/Styles';
import { LinearGradient } from 'expo-linear-gradient';
import { FIREBASE_AUTH } from '../database/firebase';
import { BlurView } from 'expo-blur';
import { AntDesign } from '@expo/vector-icons';

const WelcomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['#C8E6C9', 'white']}
          start={[0.1, 0.1]}
          style={styles.linearGradient}
        >
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              alignItems: 'center',
              marginVertical: 50,
            }}
          >
            <BlurView intensity={100}>
              <View
                style={{
                  width: '90%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#CCCCCC',
                  padding: 10,
                }}
              >
                <Text
                  style={[
                    styles.textTitle,
                    { color: '#333333', marginBottom: 15 },
                  ]}
                >
                  Get started{' '}
                </Text>
                <Text style={[styles.textTitleSub, { color: '#333333' }]}>
                  This app is designed for you to have easy control over your
                  patients' appointments.
                  {'\n'}
                  {'\n'}
                  To add a patient use the tabs below.
                  {'\n'}
                  {'\n'}
                  You can also see and edit your appointments at any time. Just
                  press "Appointments" on your tab bar.
                </Text>
                <View style={[styles.buttonGroup, { flexDirection: 'row' }]}>
                  <TouchableOpacity
                    onPress={() => FIREBASE_AUTH.signOut()}
                    style={[
                      styles.inputElevation,
                      {
                        backgroundColor: '#50bb52',
                        padding: 10,
                        borderRadius: 15,
                        flexDirection: 'row',
                      },
                    ]}
                  >
                    <AntDesign
                      name="logout"
                      size={24}
                      color="#333333"
                      style={styles.iconLeft}
                    />
                    <Text
                      style={{
                        color: '#333333',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      Sign Out
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default WelcomeScreen;
