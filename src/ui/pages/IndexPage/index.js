import React from 'react';

import Table from '../../components/Table';
import LeaderBoard from '../../components/LeaderBoard';
import Title from '../../components/Title';
import NewPersonForm from '../../components/NewPersonForm';

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
                    <NewPersonForm/>
                </div>
            );
        }
    }


export default IndexPage;
