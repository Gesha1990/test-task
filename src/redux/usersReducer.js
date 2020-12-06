import {productsAPI} from "../api/api";


const ADD_USERS = 'ADD-USERS';
const ADD_COMMENTS = 'ADD-COMMENTS';

let initialState = {
  users:[],
  isLoaded: false,
  image: false,
  comments: false
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USERS: {
      return {
        ...state,
        users: action.users,
        isLoaded: action.isLoaded
      }
    }
    case ADD_COMMENTS: {
      return {
        ...state,
        comments: action.comments,
        isLoaded: action.isLoaded
      }
    }
    default:
      return state;
  }
};
const addUsersAC = (users) => ({ type: ADD_USERS, users});
const addCommentsAC = (comments) => ({ type: ADD_COMMENTS, comments, isLoaded: true });

export const getAllUsersThunkCreator = () => {
  return (dispatch) => {
    productsAPI.getAllUsers()
      .then(data => {
        dispatch(addUsersAC(data))
      })
  }
};

export const getCommentsThunkCreator = (userId) => {
  return (dispatch) => {
    productsAPI.getUserData(userId)
      .then(data => {
        dispatch(addCommentsAC(data))
      })
  }
};

export default usersReducer;
