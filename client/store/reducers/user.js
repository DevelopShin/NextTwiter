import {
  LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL,
  LOAD_MYINFO_REQUEST, LOAD_MYINFO_SUCCESS, LOAD_MYINFO_FAIL,

  LOGIN_REQUEST, LOGOUT_REQUEST, LOGOUT_SUCCESS,

  LOGIN_FAIL, LOGOUT_FAIL, LOGIN_SUCCESS,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL,
  
  CHANGENICKNAME_REQUEST, CHANGENICKNAME_SUCCESS, CHANGENICKNAME_FAIL,

  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAIL,
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAIL,


  ADD_POST_TO_ME, REMOVE_POST_OF_ME,
} from "../types"
import produce from "immer"

const initialState = {

  loadUserDone: false,
  loadUserLoading: false, // 유저정보가져오기
  loadUserErr: null,

  loadMyInfoDone: false,
  loadMyInfoLoading: false, // 유저정보가져오기
  loadMyInfoErr: null,

  loginDone: false,
  loginLoading: false, // 로그인 로딩중
  loginErr: null,
  loginData: {},

  logoutDone: false,
  logoutLoading: false, // 로그아웃 로딩중
  logoutErr: null,

  followDone: false,
  followLoading: false, // 로그아웃 로딩중
  followErr: null,
  followId : null,

  unfollowDone: false,
  unfollowLoading: false, // 로그아웃 로딩중
  unfollowErr: null,

  signUpLoading: false, // 회원가입 실행중
  signUpDone: false,
  signUpErr: null,
  signUpData: null,

  changeNicknameLoading: false, // 회원가입 실행중
  changeNicknameDone: false,
  changeNicknameErr: null,
  changeNicknameData: {},
  userInfo:null,
  me: null,
}


const user = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 내정보
      case LOAD_MYINFO_REQUEST:
        draft.loadMyInfoLoading = true

        break;

      case LOAD_MYINFO_SUCCESS:
        // draft.loginDone = true
        draft.loadMyInfoLoading = false
        draft.loadMyInfoDone = true
        draft.me = action.payload
        break;

      case LOAD_MYINFO_FAIL:
        draft.loadMyInfoDone = false
        draft.loadMyInfoLoading = false
        draft.loadMyInfoErr=action.payload.msg
        break;
///////////////////////////////// 유저정보

      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true

        break;

      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false
        draft.loadUserDone = true
        draft.userInfo = action.payload
        break;

      case LOAD_USER_FAIL:
        draft.loadUserDone = false
        draft.loadUserLoading = false
        draft.loadUserErr=action.payload.msg
        break;

      // 팔로우
      case FOLLOW_REQUEST:
        draft.followLoading = true
        draft.followErr = null
        draft.followDone = false
        draft.followId = action.UserId
        break;

      case FOLLOW_SUCCESS:
        draft.followDone = true
        draft.followLoading = false
        draft.followErr = null
        draft.me.Followings.push(action.payload)
        break;

      case FOLLOW_FAIL:
        draft.followDone = false
        draft.followLoading = false
        draft.followErr=action.payload.msg
        break;

// 언팔로우 ////////////////////////////////////
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true
        draft.unfollowErr = null
        draft.unfollowDone = false
        draft.followId = action.mailId

        break;

      case UNFOLLOW_SUCCESS:
        draft.unfollowDone = true
        draft.unfollowLoading = false
        draft.unfollowErr = null
        draft.me.Followings = draft.me.Followings.filter((v)=>v.id !== action.payload.id)

        break;

      case UNFOLLOW_FAIL:
        draft.unfollowDone = false
        draft.unfollowLoading = false
        draft.unfollowErr =action.payload.msg
        break;

///////////////////////////////////////////////
      // 로그인
      case LOGIN_REQUEST:
        draft.loginLoading = true
        draft.loginDone = false
        draft.loginErr = null
        draft.loginData = null
        break;

      case LOGIN_SUCCESS:
        draft.loginDone = true
        draft.loginLoading = false
        draft.loginData = action.payload
        draft.me = action.payload
        break;

      case LOGIN_FAIL:
        draft.loginDone = false
        draft.loginLoading = false
        draft.loginErr=action.payload.msg
        break;

      // 로그아웃
      case LOGOUT_REQUEST:
        draft.logoutLoading = true
        break;

      case LOGOUT_SUCCESS:
        draft.logoutLoading = false
        draft.logoutDone = true
        draft.me = null
        draft.loginDone = false
        break;

      case LOGOUT_FAIL:
        draft.logoutLoading = false
        draft.logoutDone = false
        draft.logoutErr=action.payload.msg
        break;

      // 회원가입
      case SIGNUP_REQUEST:
        draft.signUpLoading = true
        draft.signUpDone = false
        // draft.signUpData = null
        draft.signUpErr = null
        break;

      case SIGNUP_SUCCESS:
        draft.signUpLoading = false
        draft.signUpDone = true
        break;

      case SIGNUP_FAIL:
        draft.signUpLoading = false
        draft.signUpErr = action.payload.msg

        break;

      //닉네임 바꾸기
      case CHANGENICKNAME_REQUEST:
        draft.changeNicknameLoading = true
        draft.changeNicknameDone = false

        draft.changeNicknameErr = null
        break;

      case CHANGENICKNAME_SUCCESS:{
        draft.changeNicknameLoading = false
        draft.changeNicknameDone = true
        if(action.payload.nickname){
          draft.me.nickname = action.payload.nickname
        }
        if(action.payload.descrip){
          draft.me.descrip=action.payload.descrip
        }
        break;
      }
      
      case CHANGENICKNAME_FAIL:
        draft.changeNicknameLoading = false
        draft.changeNicknameDone = false
        draft.changeNicknameErr=action.payload.msg
        break;
      


      case ADD_POST_TO_ME:

        draft.me.Posts.unshift({ postId: action.payload });

        // draft.me.Posts=action.payload
        break;

      case REMOVE_POST_OF_ME:

        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.payload.PostId)
        break;
        
      default:
        break
    }
  })
}

export default user
