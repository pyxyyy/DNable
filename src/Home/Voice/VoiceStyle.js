import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#222222',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  header: {
    alignItems: 'flex-end',
    width: '100%',
    padding: 20
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  footer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'AvenirNext-Regular, sans-serif',
    marginTop: 20
  },

  button: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: '#10B472',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
})

export default styles;