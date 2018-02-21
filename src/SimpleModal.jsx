import React from "react";
import { observer, inject } from "mobx-react";
import { css } from "glamor";

const modal = css({
  backgroundColor: "white",
  maxWidth: 900,
  padding: 16,
  boxShadow: "4px 0 10px 0 rgba(2, 20, 17, 0.2)",
});

const header = css({
  display: "flex",
  flexDirection: "row-reverse",
  paddingBottom: 18,
});

const icon = css({
  width: 32,
  height: 32,
  cursor: "pointer",
  ":hover": {
    opacity: 0.6,
  },
});

@inject("store")
@observer
class SimpleModal extends React.Component {
  close = () => {
    const { store } = this.props;
    store.closeModal();
  };

  render() {
    const { children } = this.props;
    return (
      <div {...modal}>
        <div {...header}>
          <img
            {...icon}
            onClick={this.close}
            src={require("./close.svg")}
            alt="close"
          />
        </div>
        {children}
      </div>
    );
  }
}

export default SimpleModal;
