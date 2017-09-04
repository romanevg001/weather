import {Actions} from './actions';
export interface IAppState {
    counter: number;
    members?: {
        countMembers: number
    }
}

export const INIT_STATE: IAppState = { counter: 0, members:{countMembers:5}} 

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type){
        case Actions.INCREMENT :  
        return Object.assign({}, state, {  counter: state.counter + 1        });
    }
    return state;
}