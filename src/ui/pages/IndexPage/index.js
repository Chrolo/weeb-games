import React from 'react';

import Table from '../../components/Table';
import LeaderBoard from '../../components/LeaderBoard';
import Title from '../../components/Title';

class IndexPage extends React.Component {
    render() {
            const tableDataHeaders = [
                {key:'name', text:"Name"},
                {key:'points',text:'Points', noFlex: true}
            ];

            return (
                <div className="page">
                    <Title>Weeb Games</Title>
                    <LeaderBoard
                        data={this.props.users}
                        dataHeaders={tableDataHeaders}
                    />
                </div>
            );
        }
    }


export default IndexPage;
