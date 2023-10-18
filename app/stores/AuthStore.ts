import { IPost } from "../types/post";
import { clearCurrentUserFromLocalStorage, returnLocalStorage } from "@/utils";
import { makeObservable, observable, action } from "mobx";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";
// import localforage from "localforage";

export interface IUser {
  id: string;
  username: string;
  email: string;
  fullname?: string;
  title?: string;
  posts?: {
    items: IPost[];
  };
  createdAt?: string;
  updatedAt?: string;
  friendsCount?: number;
  followersCount?: number;
  profilePicture?: string;
}

class AuthStoreClass {
  public currentUser: IUser | null;
  public allUsers: IUser[] | [];
  public profileUser: IUser | null;
  public updatingUser: boolean;

  constructor() {
    this.currentUser = null;
    this.profileUser = null;
    this.allUsers = [];
    this.updatingUser = false;

    makeObservable(this, {
      currentUser: observable,
      profileUser: observable,
      allUsers: observable,
      updatingUser: observable,
      loadCurrentUser: action,
      loadAllUsers: action,
      logout: action,
      isLoggedIn: action,
    });

    makePersistable(this, {
      name: "AuthStore",
      properties: ["currentUser"],
      storage: returnLocalStorage(),
    });
  }

  async loadCurrentUser(userId?: string) {}

  async loadAllUsers() {}

  async loadUserByUsername(username: string) {}
  async updateUser(fullname: string, title: string) {
    try {
      this.updatingUser = true;
      const input = {
        fullname: fullname,
        title: title,
      };
    } catch (error) {
      console.log("Error fetching user by username in AppSync:", error);
      return error;
    } finally {
      this.updatingUser = false;
    }
  }

  logout(): void {
    this.currentUser = null;
    clearPersistedStore(this);
    clearCurrentUserFromLocalStorage();
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}

export default AuthStoreClass;
export const AuthStore = new AuthStoreClass();
