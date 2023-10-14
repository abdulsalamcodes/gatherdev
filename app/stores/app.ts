import AuthStore from "./AuthStore";
import CommentStore from "./commentStore";
import PostStore from "./postStore";

export default class AppStore {
    post = new PostStore();
    comment = new CommentStore(this);
    auth = new AuthStore();
    // app = new Store();
}
