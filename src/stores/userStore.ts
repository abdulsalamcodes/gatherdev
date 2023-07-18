import {
    action,
    computed,
    makeObservable,
    observable,
    ObservableMap,
} from "mobx";
import IUser from "../types/user";
import AppStore from "./app";
import User from "@/models/userModel";

export default class UserStore {

    byId = observable.map<number, User>();

    constructor(private store: AppStore) {
        makeObservable(this, {
            load: action,
            all: computed,

        });
    }

    load(users: IUser[]) {
        users.forEach((it) => this.byId.set(it.id, new User(this.store, it)));
    }

    get all() {
        return Array.from(this.byId.values());
    }
}