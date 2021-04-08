export default {
    setUser(state, payload) {
        state.user_id = payload.id
        state.name = payload.name
        state.isAdmin = payload.level
        state.token = payload.token
    },
    usersList(state, payload){
        state.users = payload
    }
}