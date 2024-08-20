import React from 'react';

function PageHeader(props) {
  return (
    <div className="PageHeader">
      <h4 className="text-center">{props.title}</h4>
    </div>
  );
}

export default PageHeader;
