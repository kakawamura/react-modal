import React from "react";
import { observable } from "mobx";
import { observer, inject, Provider } from "mobx-react";
import { css } from "glamor";
import DevTools from "mobx-react-devtools";

import SimpleModal from "./SimpleModal";
import ModalContainer from "./ModalContainer";

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

export { SimpleModal, ModalContainer };
