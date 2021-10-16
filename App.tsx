import React, {useEffect} from 'react';

import {hide} from 'react-native-bootsplash';
import {Provider} from 'react-redux';

import Base from '~/components/Navigator/Base';
import {store} from '~/store/index';

export default function App() {
  useEffect(() => {
    hide({fade: true});
  }, []);

  return (
    <Provider store={store}>
      <Base />
    </Provider>
  );
}
