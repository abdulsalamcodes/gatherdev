import CommentStore from "./commentStore";
import PostStore from "./postStore";
import UserStore from "./userStore";

export default class AppStore {
    user = new UserStore(this);
    post = new PostStore(this);
    comment = new CommentStore(this);
}
