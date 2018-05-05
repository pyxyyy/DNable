import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333333',
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
    width: 145,
    justifyContent: 'space-between'
  },

  button: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  }
});

export default styles;