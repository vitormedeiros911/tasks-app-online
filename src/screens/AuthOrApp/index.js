import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import * as Font from 'expo-font'
import { AppLoading } from 'expo';

import { styles } from './styles'

const initialState = {
  fontsLoaded: false,
}

let customFonts = {
  'Lato': require('../../../assets/fonts/Lato.ttf'),
};

export class AuthOrApp extends Component {
  state = {
    ...initialState,
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount = async () => {
    await this._loadFontsAsync()
    const userDataJson = await AsyncStorage.getItem('userData')
    let userData = null

    try {
      userData = JSON.parse(userDataJson)
    } catch (error) {
    }

    if (userData && userData.token) {
      axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
      this.props.navigation.navigate('Home', userData)
    } else {
      this.props.navigation.navigate('Auth')
    }
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )
    } else {
      return <AppLoading />
    }
  }
}
