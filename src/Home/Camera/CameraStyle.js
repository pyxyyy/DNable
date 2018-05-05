import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },

  preview: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  button: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#59D9A6',
    marginBottom: 10
  },

  cross: {
    justifyContent: 'flex-end',
    width: '100%',
    padding: 10
  }
})

export default styles;