import { GET_TOKEN, CLEAR_TOKEN, GET_KEY, CLEAR_KEY, } from './types';
import { FETCH_VAULTS, CLEAR_VAULTS, ADD_VAULT, EDIT_VAULT, DELETE_VAULT } from './types'
import { FETCH_FOLDERS, CLEAR_FOLDERS, ADD_FOLDER, EDIT_FOLDER, DELETE_FOLDER } from './types'
import { FETCH_USER, CLEAR_USER } from './types'
import { produceKey, login, logout, fetchData, addData, editData, deleteData } from '../_services/services';
import axios from 'axios';

export const getToken = data => dispatch => {
    dispatch({ type: GET_TOKEN.SUCCESS, payload: data })
}

export const getKey = data => dispatch => {
    dispatch({ type: GET_KEY.SUCCESS, payload: data })
}

export const loginUser = (username, password) => dispatch => {
    login(username, password)
        .then(res => {
            let token = res.data.auth_token
            dispatch(getToken(token))
            dispatch(getKey(produceKey(username, password)))
            dispatch(fetchUser(token))
            dispatch(fetchFolders(token))
            dispatch(fetchVaults(token))
        })
        .catch(res => console.log(res))
}

export const continueSession = token => dispatch => {
    dispatch(fetchUser(token))
    dispatch(fetchFolders(token))
    dispatch(fetchVaults(token))
}

export const logoutUser = token => dispatch => {
    logout(token)
    dispatch({ type: CLEAR_TOKEN.SUCCESS })
    dispatch({ type: CLEAR_KEY.SUCCESS })
    dispatch({ type: CLEAR_USER.SUCCESS })
    dispatch({ type: CLEAR_FOLDERS.SUCCESS })
    dispatch({ type: CLEAR_VAULTS.SUCCESS })
}

export const fetchUser = token => dispatch => {
    fetchData('auth/users/me/', token)
        .then(res => {
            dispatch({ type: FETCH_USER.SUCCESS, payload: res.data })
        })
        .catch()
}

export const fetchFolders = token => dispatch => {
    fetchData('folders/', token)
        .then(res => {
            dispatch({ type: FETCH_FOLDERS.SUCCESS, payload: res.data })
        })
        .catch()
}

export const fetchVaults = token => dispatch => {
    fetchData('vaults/', token)
        .then(res => {
            dispatch({ type: FETCH_VAULTS.SUCCESS, payload: res.data })
        })
        .catch()
}

export const addVault = data => dispatch => {
    addData('vaults/', data)
        .then(res => {
            dispatch({ type: ADD_VAULT.SUCCESS, payload: res.data })
        })
        .catch(res => console.log(res))
}

export const editVault = data => dispatch => {
    editData(`vaults/${data.id}/`, data)
        .then(res => {
            dispatch({ type: EDIT_VAULT.SUCCESS, payload: res.data })
        })
        .catch(res => console.log(res))
}

export const deleteVault = data => dispatch => {
    deleteData(`vaults/${data}/`)
        .then(res => {
            dispatch({ type: DELETE_VAULT.SUCCESS, payload: data })
        })
        .catch(res => console.log(res))
}

export const addFolder = data => dispatch => {
    addData('folders/', data)
        .then(res => {
            dispatch({ type: ADD_FOLDER.SUCCESS, payload: res.data })
        })
        .catch(res => console.log(res))
}

export const editFolder = data => dispatch => {
    editData(`folders/${data.id}/`, data)
        .then(res => {
            dispatch({ type: EDIT_FOLDER.SUCCESS, payload: res.data })
        })
        .catch(res => console.log(res))
}

export const deleteFolder = data => dispatch => {
    deleteData(`folders/${data}/`)
        .then(res => {
            dispatch({ type: DELETE_FOLDER.SUCCESS, payload: data })
        })
        .catch(res => console.log(res))
}

export const addUser = data => dispatch => {
    console.log(data)
    axios.post('auth/users/', data)
        .then(res => {
            dispatch(loginUser(data.username, data.password))
        })
        .catch(res => console.log(res))
}