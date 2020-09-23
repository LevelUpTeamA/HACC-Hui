import React from 'react';
import withAllSubscriptions from '../../layouts/AllSubscriptionsHOC';
import InterestedDevelopersWidget from '../../components/developer/InterestedDevelopersWidget';

class InterestedDevelopers extends React.Component {
  render() {
    return (
        <InterestedDevelopersWidget/>
    );
  }
}

export default withAllSubscriptions(InterestedDevelopers);
