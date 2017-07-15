import React from 'react';

import Title from '../../components/Title';

class ErrorPage extends React.Component {
    render() {
            return (
                <div className="page">
                    <Title>Oops!</Title>
                    <p>{this.props.message}</p>
                    <p>better head back to the <a href="/">main page</a></p>
                </div>
            );
        }
    }


export default ErrorPage;
