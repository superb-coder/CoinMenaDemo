import React from "react";
import "./styles.scss";
import { Modal } from "react-bootstrap";
import { Asset } from "../../utils/types";
import PerfectScrollbar from "react-perfect-scrollbar";

interface AppAssetModalPropsType {
  isVisible: boolean;
  onClose: Function;
  onLoadMore: Function;
  onSelected(value: Asset): void;
  assets: Array<Asset>;
}

export default function AppAssetModal(props: AppAssetModalPropsType) {
  return (
    <Modal
      show={props.isVisible}
      onHide={() => props.onClose()}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Select a token</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PerfectScrollbar
          className="assets-modal"
          options={{ suppressScrollX: false }}
        >
          <ol className="list-group list-group-numbered">
            {props.assets.map((e) => (
              <li
                key={e.id}
                onClick={() => props.onSelected(e)}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{e.symbol}</div>
                  {e.name}
                </div>
              </li>
            ))}
          </ol>
        </PerfectScrollbar>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-primary w-100 mt-3"
          onClick={() => props.onLoadMore()}
        >
          Load more assets
        </button>
      </Modal.Footer>
    </Modal>
  );
}
