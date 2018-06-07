import { Action } from './actions';
import { AppState } from '../model/AppState';
import { NEW_CHILD, DELETE_CHILD, SAVE_CHILD, ADD_GIFT_TO_CHILD, UPDATE_GIFT, DELETE_GIFT
  , NEW_GIFT } from './constants';
import { Child } from '../model/Child';
import { Gift } from '../model/Gift';
import { Guid } from 'guid-typescript';

export function appStateReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case NEW_CHILD:
      let newChild: Child = {
        id: Guid.create().toString(),
        name: 'string',
        description: 'string',
        isEditMode: true,
        isNewlyCreated: true
      };
      return {...state, children: [...state.children, newChild]};
    case DELETE_CHILD:
      let children = state.children.filter((child: Child) => child.id !== action.child.id);
      return {...state, children: children};
    case SAVE_CHILD:
      const childrenWithChangedChild: Child[] = state.children.map((child: Child) => {
          if (action.child.id === child.id) {
            return {
              id: child.id,
              name: action.child.name,
              description: action.child.description,
              isEditMode: action.child.isEditMode,
              isNewlyCreated: action.child.isNewlyCreated
            };
          }
          return child;
      });
      return {...state, children: childrenWithChangedChild};
    case ADD_GIFT_TO_CHILD:
      return {...state, gifts: [...state.gifts, action.gift]};
    case UPDATE_GIFT:
      const giftsWithUpdatedGift: Gift[] = state.gifts.map((gift: Gift) => {
        if (action.gift.id === gift.id) {
          return {
            id: Guid.create().toString(),
            childId: gift.childId,
            name: action.gift.name,
            isChecked: action.gift.isChecked,
            isEditMode: false
          };
        }
        return gift;
      });
      return {...state, gifts: giftsWithUpdatedGift};
    case DELETE_GIFT:
      let gifts: Gift[] = state.gifts.filter((gift: Gift) => gift.id !== action.gift.id);
      return {...state, gifts: gifts};
    case NEW_GIFT:
      const newGift: Gift = {
        id: 'whatever',
        childId: action.childId,
        name: '',
        isChecked: false,
        isEditMode: true
      };
      return { ...state, gifts: [...state.gifts, newGift] };
    default:
      return state;
  }
}