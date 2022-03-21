import {
  ADD_POST_REQUEST, ADD_POST_FAIL, ADD_POST_SUCCESS,
  REPORT_POST_REQUEST, REPORT_POST_FAIL, REPORT_POST_SUCCESS,

  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL,
  REMOVE_POST_REQUEST, REMOVE_POST_FAIL, REMOVE_POST_SUCCESS,
  LOAD_POST_REQUEST, LOAD_POST_FAIL, LOAD_POST_SUCCESS,
  EDIT_POST_REQUEST, EDIT_POST_FAIL, EDIT_POST_SUCCESS,

  LOAD_USER_POST_REQUEST, LOAD_USER_POST_FAIL, LOAD_USER_POST_SUCCESS,
  HASHTAG_POST_REQUEST, HASHTAG_POST_FAIL, HASHTAG_POST_SUCCESS,

  LIKE_POST_REQUEST, LIKE_POST_FAIL, LIKE_POST_SUCCESS,
  RETWEET_REQUEST, RETWEET_FAIL, RETWEET_SUCCESS,



} from "../types"
import produce from "immer";
// actions
// 이전 데이터 
const timeNow = new Date()
// const timeNow = date.toFormat('YYYY-MM-DD HH24:MI')
export const initialState = {
  mainPosts: [],

  hasMorePost: false,
  postAddDone: false,
  postAddLoading: false,
  postAddErr: null,

  removeDone: false,
  removeLoading: false,
  removeErr: null,

  commentAddDone: false,
  commentAddLoading: false,
  commentAddErr: null,

  likePostDone: false,
  likePostLoading: false,
  likePostErr: null,


  loadPostDone: false,
  loadPostLoading: false,
  loadPostErr: null,

  editPostDone: false,
  editPostLoading: false,
  editPostErr: null,

  reportDone: false,
  reportLoading: false,
  reportPostId: null,
  reportErr: null,

  retweetDone: false,
  retweetLoading: false,
  retweetErr: null,
  retweetPostId:null,
  imagePath : null,
}


const post = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {

      //신고 ////////////////////////////////////////////
      case REPORT_POST_REQUEST:
        draft.reportLoading = true;
        draft.reportDone = false;
        draft.reportPostId = action.payload.PostId
        break;

      case REPORT_POST_SUCCESS:
        draft.reportLoading = false;
        draft.reportDone = true;
        break;

      case REPORT_POST_FAIL:
        draft.reportLoading = false
        draft.reportDone = false
        draft.reportErr = action.payload.msg
        break;

      //리트윗 ////////////////////////////////////////////
      case RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetPostId = action.payload.PostId
        break;

      case RETWEET_SUCCESS:
        draft.mainPosts.unshift(action.payload)
        draft.retweetLoading = false;
        draft.retweetDone = true;
        break;

      case RETWEET_FAIL:
        draft.retweetLoading = false
        draft.retweetDone = false
        draft.retweetErr = action.payload.msg
        break;


      //로딩화면 데이터 ////////////////////////////////////////////
      case LOAD_POST_REQUEST:
      case LOAD_USER_POST_REQUEST:
      case HASHTAG_POST_REQUEST:

        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostErr = null
        break;

      case LOAD_POST_SUCCESS:
      case LOAD_USER_POST_SUCCESS:
      case HASHTAG_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.concat(action.payload)
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.loadPostErr = null;
        draft.hasMorePost = action.payload.length < 10;
        break;

      case LOAD_POST_FAIL:
      case LOAD_USER_POST_FAIL:
      case HASHTAG_POST_FAIL:
        draft.loadPostLoading = false
        draft.loadPostDone = false
        draft.loadPostErr = action.payload.msg
        break;

      //포스트 like  ////////////////////////////////////////////
      case LIKE_POST_REQUEST:
        draft.likePostDone = false;
        draft.likePostLoading = true;
        draft.likePostErr = null
        break;

      case LIKE_POST_SUCCESS:{
        
        const post = draft.mainPosts.find((v)=>v.id===action.payload.PostId)
        const value = post.Likers.find((v)=>v.id === action.payload.UserId)
        // const value = draft.me.Liked.find((v)=>v.id === action.payload.PostId)

        if(value){
          post.Likers = post.Likers.filter((v)=>v.id !== action.payload.UserId)
        } else{
          post.Likers.push({id:action.payload.UserId})

        }


        draft.likePostLoading = false;
        draft.likePostDone = true;
        draft.likePostErr = null;
        break;
      }

      case LIKE_POST_FAIL:
        draft.likePostLoading = false
        draft.likePostDone = false
        draft.likePostErr = action.payload.msg
        break;

      //////////////////////////////////////////////////////////////

      case ADD_POST_REQUEST:
        draft.postAddLoading = true;
        draft.postAddDone = false;
        break;

      case ADD_POST_SUCCESS:

        draft.mainPosts.unshift(action.payload)
        draft.postAddLoading = false;
        draft.postAddDone = true;
        break;

      case ADD_POST_FAIL:

        draft.postAddLoading = false
        draft.postAddDone = false
        draft.postAddErr = action.payload.msg
        break;


//////////////////////////////////////////////////////////////

      case EDIT_POST_REQUEST:
        draft.editPostLoading = true;
        draft.editPostDone = false;
        break;

      case EDIT_POST_SUCCESS:
        draft.mainPosts.find((v)=>v.id === action.payload.PostId).content = action.payload.content
        draft.mainPosts.find((v)=>v.id === action.payload.PostId).Images = action.payload.Images
        draft.editPostLoading = false;
        draft.editPostDone = true;
        break;

      case EDIT_POST_FAIL:

        draft.editPostLoading = false
        draft.editPostDone = false
        draft.editPostErr = action.payload.msg
        break;

      //////////////////////////////////////////////////////////////

      case ADD_COMMENT_REQUEST:

        draft.commentAddLoading = true
        draft.commentAddDone = false
        draft.commentAddErr = null
        break;


      case ADD_COMMENT_SUCCESS:

        const post = draft.mainPosts.find((v) => v.id === action.payload.PostId)
        post.Comments.unshift(action.payload)
        draft.commentAddLoading = false
        draft.commentAddDone = true
        break;


      case ADD_COMMENT_FAIL:

        draft.commentAddLoading = false
        draft.commentAddDone = false
        draft.commentAddErr = action.payload.msg
        break;


      //////////////////////////////////////////////////////////////
      case REMOVE_POST_REQUEST:

        draft.removeLoading = true
        draft.removeDone = false
        break;


      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.payload.PostId)
        draft.removeLoading = false
        draft.removeDone = true
        break;


      case REMOVE_POST_FAIL:

        draft.removeLoading = false
        draft.removeDone = false
        draft.removeErr = action.payload.msg
        break;

      default:
        break;
    }
  })
}

export default post