import React from "react";
import { observable } from "mobx";
import { observer, inject, Provider } from "mobx-react";
import { css } from "glamor";
import DevTools from "mobx-react-devtools";

import SimpleModal from "./SimpleModal";

const appState = observable({
  openModalKey: null,
  props: {},
});

export const openModal = (key, props = {}) => {
  appState.openModalKey = key;
  appState.props = props;
};

export const closeModal = () => {
  appState.openModalKey = null;
  appState.props = {};
};

appState.openModal = openModal;
appState.closeModal = closeModal;

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

@inject("store")
@observer
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

export const withModal = (WrappedComponent, modals = []) => {
  return class extends React.Component {
    render() {
      return (
        <Provider store={appState}>
          <div>
            <DevTools />
            <ModalContainer>
              {modals.map((modal) => {
                return <modal.Component key={modal.key} />;
              })}
            </ModalContainer>
            <WrappedComponent />
          </div>
        </Provider>
      );
    }
  };
};

export { SimpleModal };
