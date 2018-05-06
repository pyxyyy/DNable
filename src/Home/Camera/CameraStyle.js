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
    backgroundColor: '#10B472',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },

  header: {
    alignItems: 'flex-end',
    width: '100%',
    padding: 20
  }
})

export default styles;