import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useAppDispatch } from "../../redux/store";
import { appLoginRequest } from "../../redux/Auth/actions";
import validator from "validator";

interface AppLoginModalPropsType {
  isVisible: boolean;
  onClose: Function;
}

export default function AppLoginModal(props: AppLoginModalPropsType) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onLogin = () => {
    if (!validator.isEmail(email)) {
      setEmailError("The email is not valid.");
    } else {
      setEmailError("");
    }
    if (password.length < 6) {
      setPasswordError("The password length must be more than 6 characters.");
    } else {
      setPasswordError("");
    }
    if (validator.isEmail(email) && password.length > 5) {
      dispatch(appLoginRequest(email, password));
      props.onClose();
    }
  };

  return (
    <Modal
      show={props.isVisible}
      onHide={() => props.onClose()}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>User Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="email@example.com"
            onChange={(value) => setEmail(value.target.value)}
          />
          {emailError && <label className="text-danger">{emailError}</label>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(value) => setPassword(value.target.value)}
          />
          {passwordError && (
            <label className="text-danger">{passwordError}</label>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={() => props.onClose()}>
          Close
        </button>
        <button className="btn btn-primary" onClick={() => onLogin()}>
          Log In
        </button>
      </Modal.Footer>
    </Modal>
  );
}
