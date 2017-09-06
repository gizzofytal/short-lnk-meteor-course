import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>404 - Page not found</h1>
          <p>Mmm, nothing to see here... </p>
          <Link className="button button--link" to="/">Go Home!</Link>
        </div>
      </div>
  )
};
