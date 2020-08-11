import React, { Component } from 'react'
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

import AddTask from '../AddTask'
import Task from '../../components/Task'
import { server, showError } from '../../common'

import todayImage from '../../../assets/images/today.jpg'
import tomorrowImage from '../../../assets/images/tomorrow.jpg'
import weekImage from '../../../assets/images/week.jpg'
import monthImage from '../../../assets/images/month.jpg'

import { styles } from './styles'
import commonStyles from '../../commonStyles'

const initialState = {
  showDoneTasks: true,
  showAddTask: false,
  visibleTasks: [],
  tasks: []
}

export default class TaskList extends Component {
  state = {
    ...initialState
  }

  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem('tasksState')
    const savedState = JSON.parse(stateString) || initialState
    this.setState({
      showDoneTasks: savedState.showDoneTasks
    }, this.filterTasks)

    this.loadTasks()
  }

  loadTasks = async () => {
    try {
      const maxDate = moment()
        .add({ days: this.props.daysAhead })
        .format('YYYY-MM-DD 23:59:59')
      const response = await axios.get(`${server}/tasks?date=${maxDate}`)
      this.setState({ tasks: response.data }, this.filterTasks)
    } catch (error) {
      console.warn(error);
      showError(error)
    }
  }

  filterTasks = () => {
    let visibleTasks = null
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks]
    } else {
      const pending = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pending)
    }

    this.setState({ visibleTasks })
    AsyncStorage.setItem('tasksState', JSON.stringify({
      showDoneTasks: this.state.showDoneTasks
    }))
  }

  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
  }

  toggleTask = async (taskId) => {
    try {
      await axios.put(`${server}/tasks/${taskId}/toggle`)
      this.loadTasks()
    } catch (error) {
      showError(error)
    }
  }

  addTask = async (newTask) => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição não informada!')
      return
    }

    try {
      await axios.post(`${server}/tasks`, {
        desc: newTask.desc,
        estimateAt: newTask.date
      })

      this.setState({ showAddTask: false }, this.loadTasks)
    } catch (error) {
      showError(error)
    }
  }

  deleteTask = async (taskId) => {
    try {
      await axios.delete(`${server}/tasks/${taskId}`)
      this.loadTasks()
    } catch (error) {
      showError(error)
    }
  }

  getImage = () => {
    switch (this.props.daysAhead) {
      case 0: return todayImage
      case 1: return tomorrowImage
      case 7: return weekImage
      default: return monthImage
    }
  }

  getColor = () => {
    switch (this.props.daysAhead) {
      case 0: return commonStyles.colors.today
      case 1: return commonStyles.colors.tomorrow
      case 7: return commonStyles.colors.week
      default: return commonStyles.colors.month
    }
  }

  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    return (
      <View style={styles.container}>
        <AddTask isVisible={this.state.showAddTask}
          onCancel={() => this.setState({ showAddTask: false })}
          onSave={this.addTask} />
        <ImageBackground source={this.getImage()}
          style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="bars"
                size={24} color={commonStyles.colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20} color={commonStyles.colors.secondary} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <FlatList data={this.state.visibleTasks}
            keyExtractor={item => String(item.id)}
            renderItem={({ item: task }) =>
              <Task {...task} toggleTask={this.toggleTask}
                onDelete={this.deleteTask} />
            }
          />
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: this.getColor() }]}
          onPress={() => this.setState({ showAddTask: true })}
          activeOpacity={0.7}>
          <Icon name="plus" size={20}
            color={commonStyles.colors.secondary} />
        </TouchableOpacity>
      </View>
    )
  }
}
