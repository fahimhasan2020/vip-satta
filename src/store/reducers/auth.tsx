import AsyncStorage from '@react-native-async-storage/async-storage';

const data = {
    'host': 'https://vipsatta.orfactor.com/api/v1/',
    'accessToken': '',
    'loggedIn': false,
    "user": null,
    "preference": null,
    "todaysGames": [],
    "allGames": [],
    "loader": false,
    "closestEndGame": null
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
            AsyncStorage.setItem('token', action.token.toString())
            return {
                ...state,
                accessToken: action.token
            };
        case 'CHANGE_USER':
            return {
                ...state,
                user: action.user
            };
        case 'PREERENCE_SET':
            return {
                ...state,
                preference: action.logged
            }
        case 'TODAY_GAME_SET':
            return {
                ...state,
                todaysGames: action.logged
            }
        case 'GAME_SET':
            return {
                ...state,
                allGames: action.logged
            }
        case 'CHANGE_LOADER':
            return {
                ...state,
                loader: action.loader
            }
        case 'CLOSEST_END_GAME':
            return {
                ...state,
                closestEndGame: action.game
            }
        default:
            return state;
    }
};


export default reducer;