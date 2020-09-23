import React from 'react';
import withAllSubscriptions from '../../layouts/AllSubscriptionsHOC';
import ListYourTeamsWidget from '../../components/developer/ListYourTeamsWidget';

class ListYourTeamsPage extends React.Component {
  render() {
    return (
        <ListYourTeamsWidget />
    );
  }
}

export default withAllSubscriptions(ListYourTeamsPage);
