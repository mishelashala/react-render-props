import React, { useState } from "react";
import "./App.css";

function DeleteUserModal({ onClickCancel, onClickAccept }) {
  return (
    <Modal
      header={<ModalHeader title="Delete user" />}
      content={<div className="modal__content">Dude, are you serious?</div>}
      footer={
        <ModalFooter
          cancelButtonText="Never mind"
          acceptButtonText="Delete"
          onClickCancel={onClickCancel}
          onClickAccept={onClickAccept}
        />
      }
    />
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
          acceptButtonText="Ok then..."
          onClickAccept={onClickAccept}
        />
      }
    />
  );
}

function Modal({ header, content, footer }) {
  return (
    <section className="modal">
      <div className="modal__container">
        {header}
        {content}
        {footer}
      </div>
    </section>
  );
}

function noop() {}

function ModalHeader({ title, hasCloseButton, onClickClose = noop }) {
  return (
    <header className="between">
      <h2>{title}</h2>
      {hasCloseButton && (
        <a onClick={onClickClose} href="#">
          x
        </a>
      )}
    </header>
  );
}

function ModalFooter({
  cancelButtonText,
  acceptButtonText,
  onClickCancel,
  onClickAccept,
}) {
  return (
    <footer>
      {cancelButtonText && cancelButtonText.length && (
        <button onClick={onClickCancel}>{cancelButtonText}</button>
      )}
      <button data-danger="true" onClick={onClickAccept}>
        {acceptButtonText}
      </button>
    </footer>
  );
}

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
        <DeleteUserModal
          onClickCancel={handleClickCancel}
          onClickAccept={handleClickDelete}
        />
      )}

      {isDeleteModalOpen && isConfirmation && (
        <ConfirmDeleteUserModal
          onClickClose={handleClickCancel}
          onClickAccept={handleClickConfirmDelete}
        />
      )}
    </div>
  );
}

export default App;
