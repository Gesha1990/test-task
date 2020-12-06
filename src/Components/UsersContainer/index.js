import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllUsersThunkCreator } from "../../redux/usersReducer";
import UserModal from "../UserModal/index";

import "./index.scss";

const UsersContainer = ({ getAllUsersThunkCreator, users, isLoaded }) => {
  const [modalWindowId, setOpenCloseModalWindow] = useState(false);
  const [userImg, setUserImg] = useState(null)
  useEffect(() => {
    getAllUsersThunkCreator();
  }, []);

  return (
    <div>
      <div className="users">
        {users &&
          users.map((user, key) => {
            return (
              <div className="user" key={key}>
                <img
                  src={user.avatar}
                  alt="img"
                  onClick={() => {
                    setOpenCloseModalWindow(user.id);
                    setUserImg(user.avatar)
                  }}
                />
                <div>{user.name}</div>
                <div>{user.city}</div>
              </div>
            );
          })}
      </div>
      {modalWindowId && (
        <UserModal
          id={modalWindowId}
          closeModalWindow={setOpenCloseModalWindow}
          userImg={userImg}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoaded: state.usersPage.isLoaded,
    users: state.usersPage.users,
  };
};

export default connect(mapStateToProps, {
  getAllUsersThunkCreator,
})(UsersContainer);
