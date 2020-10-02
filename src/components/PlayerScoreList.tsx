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
    <div className="card score-board">
      <h2>Top 10</h2>
      <div className="list-item container-list-title">
        <span className="list-title">Rank</span>
        <span className="list-title">Name</span>
        <span className="list-title">Score</span>
      </div>
      {users.length > 0 ? (
        sorted.map((user, index) => (
          <div className="list-item" key={user.score + index + user.name}>
            <span>{index + 1}.</span>
            <span>{user.name}</span>
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
