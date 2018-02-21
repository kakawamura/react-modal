import React from "react";
import { openModal } from "../src";

const Button = () => (
  <div>
    <button onClick={() => openModal("alert", { text: "yoooooooooooo" })}>
      Button from outside
    </button>
  </div>
);

export default Button;
