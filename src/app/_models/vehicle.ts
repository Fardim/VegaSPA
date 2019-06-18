import { Model } from './model';
import { Make } from './make';

export interface KeyValuePair {
    id: number;
    name: string;
}

export interface Contact {
    name: string;
    phone: string;
    email: string;
}

export interface Vehicle {
    id: number;
    model: KeyValuePair;
    make: KeyValuePair;
    contact: Contact;
    features: KeyValuePair[];
    isRegistered: boolean;
    lastUpdate: string;
}

export interface SaveVehicle {
    id: number;
    modelId: number;
    makeId: number;
    contact: Contact;
    features: number[];
    isRegistered: boolean;
}

export interface QueryResult<T> {
    totalItems: number;
    items: T[];
}
