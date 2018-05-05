import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#222222',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },

  container: {

  },

  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    flex: 1,
    flexDirection: 'row',
    width: 155,
    justifyContent: 'space-between'
  },

  button: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#59D9A6'
  }
});

export default styles;