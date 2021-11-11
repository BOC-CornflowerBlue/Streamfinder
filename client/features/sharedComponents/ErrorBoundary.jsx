import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      errorInfo: '',
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    process.env.NODE_ENV !== 'production' && console.log({ error, errorInfo });
    this.setState({ errorInfo });
  }

  render() {
    const { hasError, errorInfo } = this.state;
    if (hasError) {
      return (
        <div className="component">
          <div className="component-header">
            <p>
              Problem loading component{' '}
              <span
                style={{ cursor: 'pointer', color: '#0077FF' }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reload
              </span>{' '}
            </p>
          </div>
          {
            process.env.NODE_ENV !== 'production' &&
            <div className="component-body">
              <details className="error-details">
                <summary>Tell me more</summary>
                {errorInfo && errorInfo.componentStack.toString()}
              </details>
            </div>
          }
        </div>
      );
    }

    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default ErrorBoundary;