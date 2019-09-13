import {
    CHANGE_SEARCHFIELD,
    REQUEST_LIST_PENDING,
    REQUEST_LIST_SUCCESS,
    REQUEST_LIST_FAILED
} from './constants.js';


/*fetch("db.json")
      .then(res => res.json())
      .then(data =>( {filteredProducts: data.products})); */

export const displayList = () => (dispatch) => {
    dispatch({ type: REQUEST_LIST_PENDING });
    fetch("db.json")
        .then(res => res.json())
        .then(data => {
            try {
                dispatch({ type: REQUEST_LIST_SUCCESS, payload: data.products });
            } catch (error) {
                dispatch({ type: REQUEST_LIST_FAILED, payload: error });
            }

        })



}

export const setSearchField = (text) => {
    // console.log(text);
    return {
        type: CHANGE_SEARCHFIELD, //constant, usually capitalized in javascript
        payload: text //cmmonly used in redux: like sending whatevr data is needed to go on to the reducer
    }
}


export default displayList;