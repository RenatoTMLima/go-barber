import React from 'react';
import propTypes from  'prop-types';

import { Wrapper } from './styles';

export default function DefaultLayout({children}) {
  return (
    <Wrapper>{children}</Wrapper>
  );
}

DefaultLayout.propTypes = {
   children: propTypes.element.isRequired
}