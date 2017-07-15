import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../components/Title';
import Table from '../../components/PointsTable';
import AddPointsForm from '../../components/AddPointsForm';

class UserPage extends React.Component {
    render() {
        const {name, points, strings} = this.props;

        const dataHeaders = [
            {key: 'text',text: 'Reason'},
            {key: 'points', text: 'Points'}
        ];

        return (
                <div className="page">
                    <div className="back-button-bar"><a className="back-button" href="/">Back</a></div>
                    <Title>{name}</Title>
                    <span className="user-is-weeb-span">
                        has {points} weeb points because:
                    </span>
                    <Table
                        data={strings}
                        dataHeaders={dataHeaders}
                        printHeaderRow
                    />
                    <AddPointsForm/>
                </div>
        );
    }
}

UserPage.propTypes = {
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    strings: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        points: PropTypes.number
    })).isRequired
};


export default UserPage;
