import React, { PureComponent } from 'react';

import './Text.css';

class Text extends PureComponent {
  render() {
    const { title, subtitle, children } = this.props;

    return (
        <div className="container">
            <h2>
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