import React from 'react';
import PropTypes from 'prop-types';

class AddPointsForm extends React.Component {
    render(){
        return(
            <form method="post" target="_self">
            <div className="form-container"> 
                <span style={{color:'white'}}>and also:</span>
                <input className="form-input text-input" type="text" name="reason"/>
                <input className="form-input numeric-input" type="number" name="points"/>
                <input className="form-submit" type="submit" value="or so I heard"/>
                </div>
            </form>
        );
    }
}

export default AddPointsForm;
