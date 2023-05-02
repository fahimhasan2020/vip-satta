import AsyncStorage from '@react-native-async-storage/async-storage';

const data = {
    'host': 'https://7041-202-134-14-159.ngrok-free.app/api/v1/',
    'accessToken': '',
    'loggedIn': false,
    "user":null
};

const reducer = (state = data, action) => {
    switch (action.type) {
        case 'LOGOUT':
            AsyncStorage.setItem('loggedIn', 'false')
            return {
                ...state,
                loggedIn: action.logged,
            };
        case 'LOGIN':
            AsyncStorage.setItem('loggedIn', 'true')
            return {
                ...state,
                loggedIn: action.logged
            };
        case 'CHANGE_TOKEN':
            AsyncStorage.setItem('token',action.token.toString())
            return {
                ...state,
                accessToken: action.token
            };
        case 'CHANGE_USER':
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};


export default reducer;