import React from "react";
import Button from "./Button";
import { withModal, Modal, openModal, closeModal, SimpleModal } from "../src";

const App = () => (
  <div>
    <h1>Hello, Modal</h1>
    <button onClick={() => openModal("alert", { text: "HI" })}>
      Toggle Modal A
    </button>
    <button onClick={() => openModal("alert", { text: "Boo" })}>
      Toggle Modal B
    </button>
    <button onClick={() => openModal("alert", { text: "iCCCCCCCCCCCCCCCCcc" })}>
      Toggle Modal C
    </button>
    <Button />
  </div>
);

const Alert = ({ text }) => (
  <SimpleModal>
    Alert {text}
    <button onClick={closeModal}>close</button>
  </SimpleModal>
);

const modals = [
  {
    key: "alert",
    Component: Alert,
  },
];

export default withModal(App, modals);
