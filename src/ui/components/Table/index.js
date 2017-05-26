import React from 'react';
import PropTypes from 'prop-types';


class Table extends React.Component {

    constructor(props){
        super(props);
        //Bind 'this' to functions
        this.renderHeaderRow = this.renderHeaderRow.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.getDataCellOrder = this.getDataCellOrder.bind(this);
    }

    getDataCellOrder(){
        if(this.props.dataHeaders) {
            return this.props.dataHeaders;
        } else {
            //figure out all the keys in the set:
            const allKeys = this.props.data.reduce((acc,dataRow)=>{
                Object.keys(dataRow).forEach((key)=>{
                    if(!acc.includes(key)){
                        acc.push(key);
                    }
                });
                return acc;
            }, []);

            return allKeys.map(key => ({key ,text: key}));
        }
    }

    renderHeaderRow(){
        return (
            <tr className="table-header">
                {this.getDataCellOrder().reduce((acc, header, index)=>{return [...acc, <th key={index}>{header.text}</th>]},[])}
            </tr>
        );
    }

    renderRow(rowData, index){
        let innerRow = this.getDataCellOrder().map((header,index)=><td key={index}>{rowData[header.key]}</td>);

        return (
            <tr key={index}>{innerRow}</tr>
        );
    }

    render(){
        const {data, printHeaderRow} = this.props;
        console.log(this.props);
        return(
            <table>
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

Table.propTypes = {
    dataHeaders: PropTypes.arrayOf(PropTypes.shape({
        key:PropTypes.string.isRequired,
        text:PropTypes.string})
    ),
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    printHeaderRow: PropTypes.bool
};

export default Table;
