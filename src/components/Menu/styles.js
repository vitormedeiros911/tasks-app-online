import { StyleSheet, Platform } from 'react-native'
import commonStyles from '../../commonStyles'

export const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: '#DDD',

  },

  title: {
    color: '#000',
    fontFamily: 'Lato',
    fontSize: 28,
    marginTop: Platform.OS === 'ios' ? 40: 30
  },

  avatar: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 30,
    margin: 10,
    backgroundColor: '#222',
  },

  userInfo: {
    marginLeft: 10,
  },

  name: {
    fontFamily: 'Lato',
    fontSize: 18,
    marginBottom: 5,
    color: commonStyles.colors.mainText
  },

  email: {
    fontFamily: 'Lato',
    fontSize: 15,
    color: commonStyles.colors.subText,
    marginBottom: 5,
  },

  logoutIcon: {
   marginLeft: 10,
   marginBottom: 10
  }
})
