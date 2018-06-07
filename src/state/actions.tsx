import * as constants from './constants';
import { Child } from '../model/Child';
import { Gift } from '../model/Gift';

export interface NewChild {
    type: constants.NEW_CHILD;
}

export interface DeleteChild {
    type: constants.DELETE_CHILD;
    child: Child;
}

export interface SaveChild {
    type: constants.SAVE_CHILD;
    child: Child;
}

export interface AddGiftToChild {
    type: constants.ADD_GIFT_TO_CHILD;
    child: Child;
    gift: Gift;
}

export interface CheckGift {
    type: constants.CHECK_GIFT;
    gift: Gift;
    isChecked: boolean;
}

export interface UpdateGift {
    type: constants.UPDATE_GIFT;
    gift: Gift;
}

export interface DeleteGift {
    type: constants.DELETE_GIFT;
    gift: Gift;
}

export interface NewGift {
    type: constants.NEW_GIFT;
    childId: string;
}

export type Action = NewChild | DeleteChild | SaveChild |
    AddGiftToChild | CheckGift | UpdateGift | DeleteGift | NewGift;

export const newChild = (): NewChild => ({
    type: constants.NEW_CHILD
});

export const deleteChild = (child: Child): DeleteChild => ({
    type: constants.DELETE_CHILD,
    child: child
});

export const saveChild = (child: Child): SaveChild => ({
    type: constants.SAVE_CHILD,
    child: child
});

export const addGiftToChild = (child: Child, gift: Gift): AddGiftToChild => ({
    type: constants.ADD_GIFT_TO_CHILD,
    child: child,
    gift: gift
});

export const checkGift = (gift: Gift, isChecked: boolean): CheckGift => ({
    type: constants.CHECK_GIFT,
    gift: gift,
    isChecked: isChecked
});

export const updateGift = (gift: Gift): UpdateGift => ({
    type: constants.UPDATE_GIFT,
    gift: gift
});

export const deleteGift = (gift: Gift): DeleteGift => ({
    type: constants.DELETE_GIFT,
    gift: gift
});

export const newGift = (childId: string): NewGift => ({
    type: constants.NEW_GIFT,
    childId: childId
});
