import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#222222',
    alignItems: 'center'
  },

  container: {
    width: '100%',
    height: '100%'
  },

  body: {
    padding: 30,
    flexDirection: 'column',
    alignItems: 'center'
  },

  header: {
    height: 100,
    width: '100%',
    backgroundColor: '#57FF57',
    padding: 10,
    opacity: 0.7,
    borderRadius: 5
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flex: 1,
    flexDirection: 'row',
    width: 155,
    justifyContent: 'space-between'
  },

  button: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: '#10B472',
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'AvenirNext-Regular, sans-serif',
    textAlign: 'justify'
  }
});

export default styles;