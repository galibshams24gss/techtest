import tasks from '../../data/tasks'

const state = {
  tasks: tasks
}

const getters = {
  tasks(state){
    return state.tasks
  }
}

const mutations = {
  fetchTasks (state, tasks) {
    state.tasks = tasks;
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}