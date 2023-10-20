import { IPost } from "../types/post";
import { apiConfig, errorHandler, returnLocalStorage } from "@/utils";
import axios from "axios";
import { makeObservable, observable, action } from "mobx";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";

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
  public token: string;
  public allUsers: IUser[] | [];
  public updatingUser: boolean;

  constructor() {
    this.currentUser = null;
    this.token = "";
    this.allUsers = [];
    this.updatingUser = false;

    makeObservable(this, {
      currentUser: observable,
      token: observable,
      allUsers: observable,
      updatingUser: observable,

      loginUser: action,
      registerUser: action,
      continueWithGoogle: action,

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

  async registerUser(data: any): Promise<any> {
    try {
      const resp = await axios.request(
        apiConfig("post", "oauth2/register", data)
      );
      console.log("REGISTER USER SUCCESS", resp.data.user);
      this.currentUser = resp.data.user;
      this.token = resp.data.token;
      return resp.data;
    } catch (error: any) {
      return errorHandler(error);
    }
  }

  // LOG IN USER.
  async loginUser(data: any) {
    try {
      const resp = await axios.request(apiConfig("post", "oauth2/login", data));
      console.log("LOGIN USER SUCCESS", resp.data.data.user);
      this.currentUser = resp.data.data.user;
      this.token = resp.data.data.token;
      return resp.data;
    } catch (error: any) {
      return errorHandler(error);
    }
  }

  async continueWithGoogle() {}

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
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}

export default AuthStoreClass;
export const AuthStore = new AuthStoreClass();
