import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#222222',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    padding: 10
  },
  cardContainer: {
    width: '100%',
    height: 150,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  cardHeader: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  cardPicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  cardFooter: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  text: {
    fontSize: 15,
    flex: 9
  }
})

export default style;