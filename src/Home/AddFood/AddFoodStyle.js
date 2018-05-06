import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#222222',
    alignItems: 'center'
  },
  content: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  itemBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 400,
    height: 300,
    backgroundColor: 'red'
  },
  titleBox: {
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#10B472',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  table: {
    width: '100%',
    height: 200
  },
  tableRow: {
    flex: 1,
    flexDirection: 'row',
  },
  tableCellLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 5
  },
  tableCellRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    margin: 5
  },
  text: {
    color: 'white',
    fontSize: 15
  },
  button: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginTop: 100,
    backgroundColor: '#10B472',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default styles;