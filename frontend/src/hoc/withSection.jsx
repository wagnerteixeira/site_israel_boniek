import React from 'react';
import './withSection.css';

const withSection = (WrappedComponent) => (props) => {
    return (
      <div className="container-section">
        <WrappedComponent {...props}>          
        </WrappedComponent>
      </div>
    )
};

export default withSection;
