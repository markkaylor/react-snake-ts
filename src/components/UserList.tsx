import React from "react";
import PropTypes from "prop-types";

interface User {
  name: string;
  score: number;
}

type UserListProps = {
  users: User[];
};

const UserList = ({ users }: UserListProps) => {
  const sorted = users
    .slice(0, 10)
    .sort((a, b) => (a.score < b.score ? 1 : -1));

  return (
    <div>
      <h2>Top 10</h2>
      {users.length > 0 ? (
        sorted.map((user, index) => (
          <div key={user.score + index + user.name}>
            <span>
              {index + 1} {user.name}
            </span>
            <span>{user.score}</span>
          </div>
        ))
      ) : (
        <p>No scores yet!</p>
      )}
    </div>
  );
};

export default UserList;

UserList.propTypes = {
  users: PropTypes.array,
};
