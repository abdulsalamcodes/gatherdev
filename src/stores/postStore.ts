import {
    action,
    computed,
    makeObservable,
    observable,
    ObservableMap,
} from "mobx";
import IPost from "../types/post";
import AppStore from "./app";
import Post from "@/models/postModel";

export default class PostStore {

    byId = new ObservableMap<number, Post>();

    constructor(private store: AppStore) {
        makeObservable(this, {
            load: action,
            all: computed,
        });
    }

    load(posts: IPost[]) {
        posts.forEach((it) => this.byId.set(it.id, new Post(this.store, it)));
    }

    get all() {
        return Array.from(this.byId.values());
    }
}