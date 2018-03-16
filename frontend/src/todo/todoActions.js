//Action Creators
import axios from 'axios'

const URL = 'http://localhost:3003/todos/'

export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

//action gerenciada pelo middlware thunk onde vc trata varios promisses
export const search = () => {
    //getState provido pelo middleware thunk
    //esse metodo evita que fiquemos passando o description para os demais metodos tais como done e pending
    return(dispatch, getState)=>{
        const description = getState().todo.description
        const search = description ? '&description__regex=/'+ description +'/' : ''
        const request = axios.get(URL + '?sort=-createdAt' + search)
        .then(resp => dispatch({type: 'TODO_SEARCHED', payload: resp.data}))        
    }
}

//comentado para deixar de usar multi para usar thunk
/*export const add = description => {
    const request = axios.post(URL, {description} )    
    return [ { type: 'TODO_ADDED', payload: request }, seach()]
}*/

//TODO_ADDED não foi declarada no switch da action porque o serach dipara uma action que é tratada naquela classe Action
//action gerenciada pelo middlware thunk onde vc trata varios promisses
export const add = description => {
    return dispatch => {
        axios.post(URL, {description})
            //.then(resp => dispatch({ type: 'TODO_ADDED', payload: resp.data }))
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
    }
}

//TODO_MARKED_AS_DONE não foi declarada no switch da action porque o serach dipara uma action que é tratada naquela classe Action
//action gerenciada pelo middlware thunk onde vc trata varios promisses
export const markAsDone = todo => {
    return dispatch => {
        axios.put(URL + todo._id, {...todo, done: true })
        //.then(resp => dispatch({type: 'TODO_MARKED_AS_DONE', payload: resp.data }))        
        .then(reps => dispatch(search(todo.description)))
    }
}

//TODO_MARKED_AS_PENDING não foi declarada no switch da action porque o serach dipara uma action que é tratada naquela classe Action
export const markAsPending = todo => {
    return dispatch => {
        axios.put(URL + todo._id, {...todo, done: false })
        //.then(resp => dispatch({type: 'TODO_MARKED_AS_PENDING', payload: resp.data }))        
        .then(reps => dispatch(search()))
    }
}

//action gerenciada pelo middlware thunk onde vc trata varios promisses
export const remove = todo => {
    return dispatch => {
        axios.delete(URL + todo._id)        
        .then(reps => dispatch(clear()))
        .then(reps => dispatch(search()))
    }
}

//action gerenciada pelo middlware multi onde vc pode chamar varios metodos das actions
export const clear = () => {    
    //o colchete [] significa retorno de multiplas ações( disponibilizadas pelo middleware multi)
    return [{ type:'TODO_CLEAR' }, search()]
}