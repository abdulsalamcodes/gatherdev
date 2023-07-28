import Comment from "@/models/commentModel";
import { ObservableMap, action, computed, makeObservable } from "mobx";
import AppStore from "./app";
import { IComment } from "@/types/comment";

export default class CommentStore {
    byId = new ObservableMap<number, Comment>();
    constructor(private store: AppStore) {
        makeObservable(this, {
            load: action,
            all: computed,
        });
    }

    load(comments: IComment[]) {
        // @ts-ignore
        comments.forEach((it) => this.byId.set(it.id, new Comment(this.store, it)))
    }

    get all() {
        return Array.from(this.byId.values());
    }
}