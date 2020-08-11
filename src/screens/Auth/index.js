import React, { Component } from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'

import AuthInput from '../../components/AuthInput'
import { server, showError, showSuccess } from '../../common'

import backgroundImg from '../../../assets/images/login.jpg'

import { styles } from './styles'

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  stageNew: false
}

export default class Auth extends Component {
  state = {
    ...initialState,
  }

  signInOrSignup = () => {
    if (this.state.stageNew) {
      this.signUp()
    } else {
      this.signIn()
    }
  }

  signUp = async () => {
    try {
      await axios.post(`${server}/signup`, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      })

      showSuccess('Usuário cadastrado com sucesso!')
      this.setState({ ...initialState })
    } catch (error) {
      showError(error)
    }
  }

  signIn = async () => {
    try {
      const res = await axios.post(`${server}/signin`, {
        email: this.state.email,
        password: this.state.password,
      })

      AsyncStorage.setItem('userData', JSON.stringify(res.data))
      axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
      this.props.navigation.navigate('Home', res.data)
    } catch (error) {
      showError(error)
    }
  }

  render() {
    const validations = []
    validations.push(this.state.email && this.state.email.includes('@'))
    validations.push(this.state.password && this.state.password.length >= 6)

    if (this.state.stageNew) {
      validations.push(this.state.name && this.state.name.trim().length >= 3)
      validations.push(this.state.confirmPassword === this.state.password)
    }

    const validForm = validations.reduce((total, atual) => total && atual)
    return (
      <ImageBackground source={backgroundImg} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subTitle}>
            {this.state.stageNew ? 'Crie a sua conta' : 'Informe seu dados'}
          </Text>
          {this.state.stageNew &&
            <AuthInput
              icon="user"
              placeholder="Nome"
              value={this.state.name}
              onChangeText={name => this.setState({ name })} />
          }
          <AuthInput
            icon="at"
            placeholder="E-mail"
            value={this.state.email}
            onChangeText={email => this.setState({ email })} />
          <AuthInput
            icon="lock"
            placeholder="Senha"
            value={this.state.password}
            secureTextEntry
            onChangeText={password => this.setState({ password })} />
          {this.state.stageNew &&
            <AuthInput
              icon="asterisk"
              placeholder="Confirmar senha"
              secureTextEntry
              value={this.state.confirmPassword}
              onChangeText={confirmPassword => this.setState({ confirmPassword })} />
          }
          <TouchableOpacity
            style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}
            onPress={this.signInOrSignup}
            disabled={!validForm}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>
              {this.state.stageNew ? 'Cadastrar' : 'Entrar'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => this.setState({ stageNew: !this.state.stageNew })}
          activeOpacity={0.6}>
          <Text style={styles.buttonText}>
            {this.state.stageNew ? 'Login' : 'Cadastre-se'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}
