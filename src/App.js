import React, { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState({
    1: { id: 1, name: "John Doe" },
    2: { id: 2, name: "jenny doe" },
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleClickDeleteUser = (id) => () => {
    setUserId(id);
    setIsDeleteModalOpen(true);
  };

  const handleClickDelete = () => {
    setIsConfirmation(true);
  };

  const handleClickCancel = () => {
    setIsDeleteModalOpen(false);
    setIsConfirmation(false);
  };

  const handleClickConfirmDelete = () => {
    const updatedUsers = { ...users };
    delete updatedUsers[userId];

    setUsers(updatedUsers);
    setIsConfirmation(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      {Object.keys(users).map((userId) => (
        <div key={userId}>
          Name: {users[userId].name}
          <button onClick={handleClickDeleteUser(userId)}>Delete</button>
        </div>
      ))}

      {isDeleteModalOpen && !isConfirmation && (
        <section className="modal">
          <div className="modal__container">
            <header>
              <h2>Delete User</h2>
            </header>
            <div className="modal__content">
              You are about to remove a user, are you sure about that?
            </div>
            <footer>
              <button onClick={handleClickCancel}>Never mind</button>
              <button data-danger="true" onClick={handleClickDelete}>
                Delete
              </button>
            </footer>
          </div>
        </section>
      )}

      {isDeleteModalOpen && isConfirmation && (
        <section className="modal">
          <div className="modal__container">
            <header>
              <h2>Are you really sure?</h2>
            </header>
            <div className="modal__content">Dude, are you serious?</div>
            <footer>
              <button onClick={handleClickCancel}>I regret everything</button>
              <button data-danger="true" onClick={handleClickConfirmDelete}>
                Ok then...
              </button>
            </footer>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
