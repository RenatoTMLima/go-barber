import React from 'react';
import propTypes from  'prop-types';

import { Wrapper, Content } from './styles';

export default function AuthLayout({children}) {
  return (
    <Wrapper>
      <Content>
        {children}
      </Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
   children: propTypes.element.isRequired
}