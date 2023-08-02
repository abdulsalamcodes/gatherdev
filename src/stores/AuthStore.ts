"use client"

import { IPost } from "@/types/post";
import {
  clearCurrentUserFromLocalStorage, returnLocalStorage,
} from "@/utils";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { makeObservable, observable, action } from "mobx";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";
// import localforage from "localforage";


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
  public profileUser: IUser | null;

  constructor() {
    this.currentUser = null;
    this.profileUser = null;
    this.allUsers = [];

    makeObservable(this, {
      currentUser: observable,
      profileUser: observable,
      allUsers: observable,
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

  async loadUserByUsername(username: string) {
    try {
      // @ts-ignore
      const { data } = await API.graphql({
        query: queries.listUsers,
        variables: {
          limit: 1, // Fetch only one user
          filter: {
            username: {
              eq: username // Filter by the provided username
            }
          }
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
  
      console.log("User data", data.listUsers.items[0]); // Access the first user from the list
      // Do something with the user data
      this.profileUser = data.listUsers.items[0];
    } catch (error) {
      console.log("Error fetching user by username in AppSync:", error);
    }
  }
  
  

  logout(): void {
    this.currentUser = null;
    clearPersistedStore(this)
    clearCurrentUserFromLocalStorage();
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}

export default AuthStoreClass;
export const AuthStore = new AuthStoreClass();
