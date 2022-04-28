import React, { useState } from "react";
import { useAppSelector } from "../../redux/store";
import AppLoginModal from "../AppLoginModal";

export default function AppHeader() {
  const [show, setShow] = useState(false);

  const storedEmail = useAppSelector((state) => state.auth.email);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-white border-bottom px-3">
      <div className="container-fluid">
        <a className="navbar-brand text-black fw-bold" href="/">
          COINMENA
        </a>
        {!storedEmail && (
          <button
            className="btn btn-primary ms-auto"
            onClick={() => handleShow()}
          >
            Login
          </button>
        )}
        {storedEmail && (
          <div className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle">
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>mdo</strong>
          </div>
        )}
      </div>
      <AppLoginModal isVisible={show} onClose={() => handleClose()} />
    </nav>
  );
}
