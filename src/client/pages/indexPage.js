import React from 'react';

import Table from '../components/Table';

class IndexPage extends React.Component {
    render() {
            const tableDataHeaders = [
                {key:'points',text:'Points'},
                {key:'name', text:"Name"}
            ];

            return (
                <div className="page-card">
                    <Table
                        data={this.props.users}
                        dataHeaders={tableDataHeaders}
                    />
                </div>
            );
        }
    }


export default IndexPage;
