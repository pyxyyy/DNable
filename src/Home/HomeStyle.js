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

  headerAmber: {
    width: '100%',
    backgroundColor: '#b48638',
    padding: 10,
    paddingVertical: 20,
    //opacity: 0.7,
    borderRadius: 5
  },
  headerGreen: {
    width: '100%',
    backgroundColor: '#10B472',
    padding: 10,
    paddingVertical: 20,
    //opacity: 0.7,
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
    fontSize: 15,
    color: 'white',
    fontFamily: 'AvenirNext-Regular, sans-serif',
    textAlign: 'justify'
  }
});

export default styles;