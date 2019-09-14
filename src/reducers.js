import {
    CHANGE_SEARCHFIELD,
    REQUEST_LIST_PENDING,
    REQUEST_LIST_SUCCESS,
    REQUEST_LIST_FAILED,
    FILTER_SIZE_LIST
} from './constants.js';

const initialListState = {
    isPending: false,
    filteredProducts: [],
    error: ''
}

export const displayList = (state= initialListState, action={}) =>{
    switch (action.type) {
        case REQUEST_LIST_PENDING:
            return Object.assign({}, state, {isPending: true})
        case REQUEST_LIST_SUCCESS:
            return Object.assign({}, state, {filteredProducts: action.payload, isPending: false})
        case REQUEST_LIST_FAILED:
            return Object.assign({}, state, {error: action.payload, isPending: false})
        default:
            return state;
    }
}

const initialSearchState = {
    searchField: '',
}

//my first reducer
export const searchProducts = (state = initialSearchState, action = {}) => {
  //  console.log(action.type);
    
    switch (action.type) {
        case CHANGE_SEARCHFIELD:
            return Object.assign({}, state, {searchField: action.payload, hello: "test for other properties"});
        default:
            return state;

    }
}

const initialFilterState = {
    filterField: '',
}


export const filterSize = (state = initialFilterState, action = {}) => {
  //  console.log(action.type);  
    switch (action.type) {
        case FILTER_SIZE_LIST:
            return Object.assign({}, state, {filterField: action.payload, hello: "test for other properties"});
        default:
            return state;

    }
}




export default displayList;