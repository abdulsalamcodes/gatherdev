"use client";

import { API } from "aws-amplify";
import { AuthStore, IUser } from "./stores/AuthStore";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

export async function createUserInAppSync(user: IUser) {
  try {
    // @ts-ignore
    const { data } = await API.graphql({
      query: mutations.createUser,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      variables: {
        input: {
          username: user.username,
          email: user.email,
          fullname: user.username,
          title: "Software Engineer",
          id: user.id,
        },
      },
    });

    AuthStore.loadCurrentUser(data.createUser.id);
  } catch (error) {
    console.log("Error creating user in AppSync:", error);
  }
}

export async function fetchCurrentUser(userId: string) {
  try {
    // @ts-ignore
    const { data } = await API.graphql({
      query: queries.getUser,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      variables: {
        id: userId,
      },
    });

    AuthStore.loadCurrentUser(data.getUser.id);
  } catch (error) {
    console.log("Error fetching user in AppSync:", error);
  }
}

export function getUserStoredId() {
  const currentUser = localStorage.getItem("currentUserId");
  if (currentUser) {
    return JSON.parse(currentUser);
  }
}

export function clearCurrentUserFromLocalStorage() {
  localStorage.removeItem("currentUserId");
}

// return localStorage.

export function returnLocalStorage() {
  if (typeof window !== "undefined") {
    return localStorage;
  }
}
