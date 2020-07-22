import { AppProps } from 'next/app';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import { Router } from 'next/router';
import { createWrapper } from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import React from 'react';

import store from '../redux/store';

const MyApp = (props: AppPropsType<Router, Record<string, unknown>>) => {
  const { Component, pageProps }: AppProps = props;

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
