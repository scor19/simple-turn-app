import { View, StyleSheet, ActivityIndicator } from 'react-native';

const TurnLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#50bb52" />
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