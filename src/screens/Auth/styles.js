import { StyleSheet } from 'react-native'

import commonStyles from '../../commonStyles'

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontFamily: 'Lato',
    color: commonStyles.colors.secondary,
    fontSize: 70,
  },

  subTitle: {
    fontFamily: 'Lato',
    color: commonStyles.colors.subText,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },

  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 8
  },

  button: {
    backgroundColor: '#080',
    borderRadius: 4,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },

  buttonText: {
    fontFamily: 'Lato',
    color: '#fff',
    fontSize: 20,
  }
})
