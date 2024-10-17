import { CurrentRenderContext } from '@react-navigation/native';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const TurnLoader = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={50} color="#50bb52" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TurnLoader;
