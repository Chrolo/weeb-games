import React from 'react';
import PropTypes from 'prop-types';
import className from 'classname';

class Title extends React.Component {

    render() {

        const {data} = this.props;
        return(
            <div className="title">
                    {this.props.children}
            </div>
        );
    }
}

Title.propTypes = {
    children: PropTypes.node
};
export default Title;
