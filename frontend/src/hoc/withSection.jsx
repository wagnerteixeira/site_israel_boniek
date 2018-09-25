import React from 'react'

const styles = {
    container : {
        height: '100vh',
        top: 0,
        left: 0,
        width: '100%'
    }    
}

const withSection = (WrappedComponent) => (props) => {
    return (
      <div style={styles.container}>
        <WrappedComponent {...props}>          
        </WrappedComponent>
      </div>
    )
};

export default withSection;
