import React from 'react';
import Router from 'react-router';
import DirectoryRoutes from './DirectoryRoutes';

Router.run(DirectoryRoutes, (Handler, state) => {
  React.render(
    <Handler {...state}/>,
    document.getElementById('ApplicationRootContainer')
  );
});
