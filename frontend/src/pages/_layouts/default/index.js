import React from 'react';
import propTypes from  'prop-types';

import Header from '~/components/Header';

import { Wrapper } from './styles';

export default function DefaultLayout({children}) {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
   children: propTypes.element.isRequired
}