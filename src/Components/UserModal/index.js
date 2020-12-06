import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { getCommentsThunkCreator } from "../../redux/usersReducer";
import useOutsideClick from "../../Helpers/helpers";
import Loader from "../Common/Loader";

import "./style.scss";

const UserModal = ({
  comments,
  closeModalWindow,
  id,
  isLoaded,
  getCommentsThunkCreator,
  userImg
}) => {
  useEffect(() => {
    getCommentsThunkCreator(id);
  }, []);
  const ref = useRef();
  const [comment, setComment] = useState("");
  useOutsideClick(ref, () => {
    closeModalWindow(false);
  });
  return (
    <div className="user-wrapper">
      {!isLoaded ? (
        <Loader />
      ) : (
        <div className="user-wrapper__user" ref={ref}>
          <img src={userImg} alt="img" />
          {Array.isArray(comments) &&
            comments.map((comment, id) => {
              return (
                <div className="comment" key={id}>
                  <img  src={comment.image}/>
                  <div>{comment.content}</div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoaded: state.usersPage.isLoaded,
    imageAndComment: state.usersPage.image,
    comments: state.usersPage.comments,
  };
};

export default connect(mapStateToProps, {
  getCommentsThunkCreator,
})(UserModal);
