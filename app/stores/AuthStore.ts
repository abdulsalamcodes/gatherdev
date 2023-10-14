import { IPost } from "../types/post";
import { clearCurrentUserFromLocalStorage, returnLocalStorage } from "@/utils";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
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
          filter: {
            username: {
              eq: username, // Filter by the provided username
            },
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });

      console.log("User data", data.listUsers.items[0]);
      this.profileUser = data.listUsers.items[0];
    } catch (error) {
      console.log("Error fetching user by username in AppSync:", error);
    }
  }
  async updateUser(fullname: string, title: string) {
    try {
      this.updatingUser = true;
      const input = {
        fullname: fullname,
        title: title,
      };

      const resp = API.graphql(graphqlOperation(mutations.updateUser, input));

      console.log("UpdatedUser", resp);

      // Do something with the user data
      // this.currentUser = data.updateUser;
      // return data.updateUser;
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
