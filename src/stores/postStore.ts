import {
    action,
    computed,
    makeObservable,
    observable,
    ObservableMap,
} from "mobx";
import Post from "@/models/postModel";
import { IPost } from "@/types/post";
import AppStore from "./app";

class PostStoreClass {

    byId = new ObservableMap<string, Post>();
    public posts: IPost[] | [];

    constructor(private store: AppStore) {
        this.posts = [],

            makeObservable(this, {
                load: action,
                posts: observable,
                all: computed,
            });
    }

    load(posts: IPost[] | []) {
        this.posts = posts;
    }

    get all() {
        return Array.from(this.byId.values());
    }
}
// const PostStore = new PostStoreClass();
export default PostStoreClass;