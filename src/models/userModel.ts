import { computed, makeObservable } from "mobx";
import AppStore from "../stores/app";
import IUser from "../types/user";

export default class User implements IUser {

  id: number;
  name: string;
  username: string;
  email: string;

  constructor(private store: AppStore, user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;

    makeObservable(this, {
      posts: computed
    })
  }

  get posts () {
    return this.store.post.all.filter(post => post.userId === this.id);
  }
}