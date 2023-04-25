import AsyncStorage from '@react-native-async-storage/async-storage';

const data = {
    'host': 'http://nexkraft.com/',
    'firstName': '',
    'lastName': '',
    'phoneNumber': '',
    'accessToken': '',
    'loggedIn': false,
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
            return {
                ...state,
                loggedIn: action.logged
            };
        case 'CHANGE_TOKEN':
            return {
                ...state,
                accessToken: action.token
            };
        default:
            return state;
    }
};


export default reducer;