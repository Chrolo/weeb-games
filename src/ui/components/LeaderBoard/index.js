import React from 'react';
import PropTypes from 'prop-types';
import className from 'classname';

class LeaderBoard extends React.Component {

        constructor(props) {
            super(props);
            //Bind 'this' to functions
            this.renderRow = this.renderRow.bind(this);
        }

        renderRow(rowData, index) {

            //Get order in which data keys will be displayed:
            const dataHeaders = this.props.dataHeaders || rowData.keys().map(key => {
                key: key
            });

            //generate cells
            const innerRow = dataHeaders.map((header, index) => {
                    const cellClasses = className({
                        'leader-board-cell': true,
                        'no-flex': header.noFlex
                    });
                    return ( <div className = {cellClasses} key={index}> {rowData[header.key]} </div>);
                    });

                //Figure out the style classes
                const rowClasses = className({
                    'leader-board-row': true,
                    'first': index === 0,
                    'second': index === 1,
                    'third': index === 2,
                });

                return (
                    <a className={rowClasses} key={index} href={`/user/${rowData.name}`}>
                        {innerRow}
                    </a>
                );
            }


            render() {

                const {data} = this.props;
                return (
                    <div className="leader-board-container" >
                        {data.map(this.renderRow)}
                    </div>
                );
            }
        }

        LeaderBoard.propTypes = {
            dataHeaders: PropTypes.arrayOf(PropTypes.shape({
                key: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
                noFlex: PropTypes.bool
            })),
            data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        };
        export default LeaderBoard;
