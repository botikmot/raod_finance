export default {
    name(state) {
        return state.name
    },
    token(state) {
        return state.token
    },
    isAdmin(state) {
        return state.isAdmin
    },
    isAuthenticated(state) {
        return !!state.token
    },
    getUserId(state){
        return state.user_id
    },
    getUsers(state){
        return state.users
    }
}