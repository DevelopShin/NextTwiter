// export const initialState = {

import { ADD_POST_REQUEST, ADD_COMMENT_REQUEST, REMOVE_POST_REQUEST } from "../types";

export const addPost =(data)=> {
  return {
  type: ADD_POST_REQUEST,
  payload: data
}}

export const addComment =(data)=> {
  return {
  type: ADD_COMMENT_REQUEST,
  payload: data
}}

export const removePost =(data)=> {
  return {
  type: REMOVE_POST_REQUEST,
  payload: data
}}