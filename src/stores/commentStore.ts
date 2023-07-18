import Comment from "@/models/commentModel";
import IComment from "@/types/comment";
import { ObservableMap, action, computed, makeObservable } from "mobx";
import AppStore from "./app";

export default class CommentStore {
    byId = new ObservableMap<number, Comment>();
    constructor(private store: AppStore) {
        makeObservable(this, {
            load: action,
            all: computed,
        });
    }

    load(comments: IComment[]) {
        comments.forEach((it) => this.byId.set(it.id, new Comment(this.store, it)))
    }

    get all() {
        return Array.from(this.byId.values());
    }
}