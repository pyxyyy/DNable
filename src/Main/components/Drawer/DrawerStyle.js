import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#222222",
    width: "100%",
  },

  container: {
    justifyContent: 'flex-start'
  },

  imageContainer: {
    width: '100%'
  },

  image: {
    resizeMode: 'contain',
    width: '100%',
    height: 100
  },

  login: {
    height: 40,
    margin: 20,
    borderRadius: 5,
    backgroundColor: '#10B472',
    justifyContent: 'center',
    alignItems: 'center'
  },

  loginText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'AvenirNext-Regular, sans-serif',
    fontWeight: "bold"
  },

  button: {
    height: 40,
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#10B472',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    //backgroundColor: '#333333'
  },

  text: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'AvenirNext-Regular, sans-serif',
    fontWeight: "bold",
    marginLeft: 10
  }
});

export default styles;