import React from "react";
import { css } from "glamor";
import { observer, inject } from "mobx-react";

const background = css({
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(2, 20, 17, 0.6)",
  width: "100%",
  height: "100%",
});

class ModalContainer extends React.Component {
  close = () => {
    const { store } = this.props;
    store.closeModal();
  };

  render() {
    const { store } = this.props;
    const children = React.Children.map(this.props.children, (child, i) => {
      if (child.key === store.openModalKey) {
        return React.cloneElement(child, store.props);
      }
      return;
    });

    if (store.openModalKey === null) {
      return null;
    }

    return (
      <div {...background} onClick={this.close}>
        {children}
      </div>
    );
  }
}

export default inject("store")(observer(ModalContainer));
