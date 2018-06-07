import { Child } from './Child';
import { Gift } from './Gift';

export interface AppState {
    children: Child[];
    gifts: Gift[];
}