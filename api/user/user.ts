/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * culinaryApp
 * OpenAPI spec version: 1.0
 */
import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type {
  UserLoginDto,
  User,
  UserDto,
  UserComment,
  Recipe,
  ShoppingList
} from '../generated-api.schemas'



  export const postApiUserSignIn = <TData = AxiosResponse<void>>(
    userLoginDto: UserLoginDto, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/api/User/SignIn`,
      userLoginDto,options
    );
  }
export const getApiUser = <TData = AxiosResponse<User[]>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/User`,options
    );
  }
export const postApiUser = <TData = AxiosResponse<void>>(
    userDto: UserDto, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/api/User`,
      userDto,options
    );
  }
export const getApiUserUserId = <TData = AxiosResponse<User>>(
    userId: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/User/${userId}`,options
    );
  }
export const putApiUserUserId = <TData = AxiosResponse<void>>(
    userId: string,
    userDto: UserDto, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.put(
      `/api/User/${userId}`,
      userDto,options
    );
  }
export const deleteApiUserUserId = <TData = AxiosResponse<void>>(
    userId: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.delete(
      `/api/User/${userId}`,options
    );
  }
export const getApiUserUserIdComments = <TData = AxiosResponse<UserComment[]>>(
    userId: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/User/${userId}/comments`,options
    );
  }
export const getApiUserUserIdRecipes = <TData = AxiosResponse<Recipe[]>>(
    userId: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/User/${userId}/recipes`,options
    );
  }
export const getApiUserUserIdShoppingLists = <TData = AxiosResponse<ShoppingList[]>>(
    userId: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/User/${userId}/shoppingLists`,options
    );
  }
export const getApiUserUserIdPlanners = <TData = AxiosResponse<ShoppingList[]>>(
    userId: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/User/${userId}/planners`,options
    );
  }
export const getApiUserUserIdWatchedRecipes = <TData = AxiosResponse<Recipe[]>>(
    userId: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/User/${userId}/watchedRecipes`,options
    );
  }