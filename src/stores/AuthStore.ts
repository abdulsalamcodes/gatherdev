import { IPost } from "@/types/post";
import { makeObservable, observable } from "mobx";

export interface IUser {
    id: string;
    username: string;
    fullname: string;
    title: string;
    email: string;
    posts: IPost[];
    createdAt: string;
    updatedAt: string;
    friendsCount: number;
    followersCount: number;
    profilePicture: string;
    
}
class AuthStoreClass {
  public currentUser: IUser | null;

  constructor() {
    this.currentUser = null;

    makeObservable(this, {
      currentUser: observable,
    });
  }

  setCurrentUser(user: IUser): void {
    this.currentUser = user;
  }

  logout(): void {
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}

// const AuthStore = new AuthStoreClass();
export default AuthStoreClass;
