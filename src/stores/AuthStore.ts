import { IPost } from "@/types/post";
import {
  clearCurrentUserFromLocalStorage,
  // persistUserData,
} from "@/utils";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { makeObservable, observable, action } from "mobx";
import { getPersistedStore, makePersistable } from "mobx-persist-store";
import localforage from "localforage";

export interface IUser {
  id: string;
  username: string;
  email: string;
  fullname?: string;
  title?: string;
  posts?: IPost[];
  createdAt?: string;
  updatedAt?: string;
  friendsCount?: number;
  followersCount?: number;
  profilePicture?: string;
}

class AuthStoreClass {
  public currentUser: IUser | null;
  public allUsers: IUser[] | [];

  constructor() {
    this.currentUser = null;
    this.allUsers = [];

    makeObservable(this, {
      currentUser: observable,
      allUsers: observable,
      loadCurrentUser: action,
      loadAllUsers: action,
      logout: action,
      isLoggedIn: action,
    });

    makePersistable(this, {
      name: "AuthStore",
      properties: ["currentUser", "allUsers"],
      storage: localforage,
    });
  }

  async loadCurrentUser(userId?: string) {
    try {
      // @ts-ignore
      const { data } = await API.graphql({
        query: queries.getUser,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        variables: {
          id: userId,
        },
      });

      console.log("data", data.getUser);
      this.currentUser = data.getUser;
    } catch (error) {
      console.log("Error fetching user in AppSync:", error);
    }
  }

  async loadAllUsers() {
    try {
      // @ts-ignore
      const { data } = await API.graphql({
        query: queries.listUsers,
        variables: { limit: 3 },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });

      console.log("data", data.listUsers.items);
      this.allUsers = data.listUsers.items;
    } catch (error) {
      console.log("Error fetching all users in AppSync:", error);
    }
  }

  logout(): void {
    this.currentUser = null;
    clearCurrentUserFromLocalStorage();
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}

export default AuthStoreClass;
export const AuthStore = new AuthStoreClass();
