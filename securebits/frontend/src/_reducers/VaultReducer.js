import { FETCH_VAULTS, CLEAR_VAULTS, ADD_VAULT, DELETE_VAULT } from '../_actions/types';

const vaultReducer = (state=[], action) => {
    switch(action.type) {
        case FETCH_VAULTS.SUCCESS:
            return action.payload
        case ADD_VAULT.SUCCESS:
            return [
                ...state,
                action.payload,
            ]
        case DELETE_VAULT.SUCCESS:
            return state.filter(vault => vault.id !== action.payload)
        case CLEAR_VAULTS.SUCCESS:
            return []
        default:
            return state
    }
}

export default vaultReducer;