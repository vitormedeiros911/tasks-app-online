import { StyleSheet, Platform } from 'react-native'

import commonStyles from '../../commonStyles'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  background: {
    flex: 3
  },

  taskList: {
    flex: 7
  },

  titleBar: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  title: {
    fontFamily: 'Lato',
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20
  },

  subtitle: {
    fontFamily: 'Lato',
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30
  },

  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 45 : 35,
    marginLeft: 24
  },

  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
