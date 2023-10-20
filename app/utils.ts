"use client";

export const errorHandler = (error: any) => {
  if (error.response) {
    if (error.response.status === 400) {
      console.log("Bad Request", JSON.stringify(error.response.data));
    } else if (error.response.status === 500) {
      console.log("Server Error", JSON.stringify(error.response.data));
    } else {
      console.log("Other Error", error.message);
    }
    console.log("errror", error.response.data);
    return error.response.data;
  } else {
    console.log("Network Error", error.message);
    throw error;
  }
};

export const apiConfig = (method: string, endpoint: string, data: any) => {
  return {
    method: method,
    maxBodyLength: Infinity,
    url: `https://gatherdev.onrender.com/${endpoint}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
};
// return localStorage.
export function returnLocalStorage() {
  if (typeof window !== "undefined") {
    return localStorage;
  }
}
