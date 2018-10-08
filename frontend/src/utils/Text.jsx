import React, { PureComponent } from 'react';

import './Text.css';

class Text extends PureComponent {
  render() {
    const { title, subtitle, children, colortitle } = this.props;

    return (
        <div className="container">
            <h2 style={{color: colortitle}}>
                {title}
            </h2>
            <h3>
                {subtitle}
            </h3>
                {children}
        </div>
    );
  }
}

export default Text;