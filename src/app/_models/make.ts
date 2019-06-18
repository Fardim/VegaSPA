import { KeyValuePair } from './vehicle';
import { Model } from './model';
export interface Make {
    id: number;
    name: string;
    models: KeyValuePair[];
}
