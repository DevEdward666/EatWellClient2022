import React from 'react';
import PropTypes from 'prop-types';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default wait;
