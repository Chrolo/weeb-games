import React from 'react';
import PropTypes from 'prop-types';


class Table extends React.Component {

    constructor(props){
        super(props);
        //Bind 'this' to functions
        this.renderHeaderRow = this.renderHeaderRow.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    renderHeaderRow(){
        if(this.props.dataHeaders){
            return (
                <tr className="table-header">
                    {this.props.dataHeaders.reduce((acc, header, index)=>{return [...acc, <th key={index}>{header.text}</th>]},[])}
                </tr>
            );
        }
        else {
            return null;
        }
    }

    renderRow(rowData){
        let innerRow;
        if( this.props.dataHeaders) {
            innerRow = this.props.dataHeaders.map((header,index)=><td key={index}>{rowData[header.key]}</td>);
        } else {
            innerRow = rowData.keys().map((key, index)=>{<td key={index}>{rowData[key]}</td>});
        }

        return (
            <tr>{innerRow}</tr>
        );
    }

    render(){
        const {data} = this.props;
        return(
            <table>
                <thead>
                    {this.renderHeaderRow()}
                </thead>
                <tbody>
                    {data.map(this.renderRow)}
                </tbody>
            </table>
        );
    }
}

Table.propTypes = {
    dataHeaders: PropTypes.arrayOf(PropTypes.shape({
        key:PropTypes.string.isRequired,
        text:PropTypes.string.isRequired})
    ),
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Table;
