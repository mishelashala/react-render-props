import React, { useState } from "react";
import "./App.css";

function noop() {}

export function ModalHeader({ title, hasCloseButton, onClickClose = noop }) {
  return (
    <header className="modal__header between">
      <h2>{title}</h2>
      {hasCloseButton && (
        <a onClick={onClickClose} href="/#">
          x
        </a>
      )}
    </header>
  );
}

function DeleteUserModal({ onClickCancel, onClickAccept }) {
  return (
    <Modal
      header={<ModalHeader title="Delete user" />}
      footer={
        <ModalFooter
          acceptButtonId="delete-modal-confirm-btn"
          acceptButtonText="Delete"
          cancelButtonId="delete-modal-cacel-btn"
          cancelButtonText="Never mind"
          onClickCancel={onClickCancel}
          onClickAccept={onClickAccept}
        />
      }
    >
      <div className="modal__content">Dude, are you serious?</div>
    </Modal>
  );
}

function ConfirmDeleteUserModal({ onClickClose, onClickAccept }) {
  return (
    <Modal
      header={
        <ModalHeader
          title="Are you really sure"
          hasCloseButton={true}
          onClickClose={onClickClose}
        />
      }
      footer={
        <ModalFooter
          acceptButtonId="confirm-modal-delete-btn"
          acceptButtonText="Ok then..."
          onClickAccept={onClickAccept}
        />
      }
    />
  );
}

export function Modal({ header, children, footer }) {
  return (
    <section className="modal">
      <div className="modal__container">
        {header}
        {children}
        {footer}
      </div>
    </section>
  );
}

function ModalFooter({
  acceptButtonId,
  acceptButtonText,
  cancelButtonId,
  cancelButtonText,
  onClickCancel,
  onClickAccept,
}) {
  return (
    <footer>
      {cancelButtonText && cancelButtonText.length && (
        <button id={cancelButtonId} onClick={onClickCancel}>
          {cancelButtonText}
        </button>
      )}
      <button id={acceptButtonId} data-danger="true" onClick={onClickAccept}>
        {acceptButtonText}
      </button>
    </footer>
  );
}

export function UserList({
  users,
  isDeleteModalOpen,
  isConfirmation,
  onClickDeleteUser,
  onClickCancel,
  onClickDelete,
  onClickConfirmDelete,
}) {
  return (
    <div>
      {Object.keys(users).map((userId) => (
        <div className="user-item" key={userId}>
          Name: {users[userId].name}
          <button
            id={`delete-user-${userId}-btn`}
            onClick={onClickDeleteUser(userId)}
          >
            Delete
          </button>
        </div>
      ))}

      {isDeleteModalOpen && !isConfirmation && (
        <DeleteUserModal
          onClickCancel={onClickCancel}
          onClickAccept={onClickDelete}
        />
      )}

      {isDeleteModalOpen && isConfirmation && (
        <ConfirmDeleteUserModal
          onClickClose={onClickCancel}
          onClickAccept={onClickConfirmDelete}
        />
      )}
    </div>
  );
}

export function App() {
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
    <UserList
      users={users}
      isDeleteModalOpen={isDeleteModalOpen}
      isConfirmation={isConfirmation}
      onClickDeleteUser={handleClickDeleteUser}
      onClickCancel={handleClickCancel}
      onClickDelete={handleClickDelete}
      onClickConfirmDelete={handleClickConfirmDelete}
    />
  );
}

export default App;
