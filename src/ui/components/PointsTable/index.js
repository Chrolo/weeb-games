import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classname';

const tablePrintDefinition = [
    {key: 'text',text: 'Reason'},
    {key: 'points', text: 'Points', align:'center'}
];

class PointsTable extends React.Component {

    constructor(props){
        super(props);
        //Bind 'this' to functions
        this.renderHeaderRow = this.renderHeaderRow.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    renderHeaderRow(){
        return (
            <tr className="points-table-header-row">
                {tablePrintDefinition.reduce((acc, header, index)=>{
                    return [
                        ...acc,
                        <th key={index} className="points-table-cell">
                            {header.text}
                    </th>
                ];
                },[])}
            </tr>
        );
    }

    renderRow(rowData, index){
        let innerRow = tablePrintDefinition.map((header,index)=><td className="points-table-cell" key={index}>{rowData[header.key]}</td>);

        const rowClasses = classname({
            'points-table-row': true,
            [`points-${rowData.points}`]: !!rowData.points
        });

        return (
            <tr key={index} className={rowClasses}>{innerRow}</tr>
        );
    }

    render(){
        const {data, printHeaderRow} = this.props;
        return(
            <table className="points-table">
                <thead>
                    {printHeaderRow ? this.renderHeaderRow() : null}
                </thead>
                <tbody>
                    {data.map(this.renderRow)}
                </tbody>
            </table>
        );
    }
}

PointsTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        points: PropTypes.number
    })).isRequired,
    printHeaderRow: PropTypes.bool
};

export default PointsTable;
