import React from 'react';
import PropTypes from 'prop-types';

class NewPersonForm extends React.Component {

    render(){
        return(
            <form method="post" target="_self" action="/user">
            <div className="form-container">
                <span className="form-label">don&apos;t forget</span>
                <div className="form-input-container">
                    <input className="form-input text-input" type="text" name="name"/>
                </div>
                <input className="form-submit" type="submit" value="they're a weeb too"/>
                </div>
            </form>
        );
    }
}

export default NewPersonForm;
