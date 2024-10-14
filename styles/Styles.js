import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white',
  },
  containerJustify: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textPlaceholder: {
    color: '#009929',
    marginBottom: 2,
    marginTop: 10,
    fontWeight: '500',
  },
  inputSingle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  inputGroupError: {
    flex: 1,
    padding: 5,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: 'white',
  },
  datePickerStyle: {
    flex: 1,
    padding: 9,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  inputElevation: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonGroup: {
    marginBottom: 10,
    marginTop: 25,
  },
  textTitle: {
    color: 'black',
    fontSize: 45,
    fontWeight: 'bold',
  },
  textTitleWhite: {
    color: '#FFFFFF',
    fontSize: 45,
    fontWeight: 'bold',
  },
  textTitleSub: {
    color: '#333333',
    marginVertical: 10,
    fontSize: 15,
  },
  textTitleSubWhite: {
    flex: 1,
    color: '#FFFFFF',
  },
  textError: {
    color: 'red',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    opacity: 0.95,
  },
  patientList: {
    padding: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    marginVertical: 10,
    fontSize: 15,
  },
  containerClear: {
    flex: 1,
    padding: 30,
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  patientReason: {
    color: '#333333',
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
    padding: 5,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  elevation: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  patientDetail: {
    padding: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    marginVertical: 5,
  }
});

export { styles };
