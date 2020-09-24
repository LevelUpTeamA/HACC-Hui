import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { removeItMethod } from '../../../api/base/BaseCollection.methods';
import { Challenges } from '../../../api/challenge/ChallengeCollection';

class ChallengeCard extends React.Component {
  render() {
    function deleteChallenge(id) {
      /* eslint-disable-next-line */
      if (confirm('Do you really want to remove this Challenge?')) {
        removeItMethod.call({
          collectionName: Challenges.getCollectionName(),
          instance: Challenges.getID(id) }, (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Challenge deleted successfully', 'success')));
      }
    }
    return (
      <Card fluid={true}>
        <Card.Content>
          <Card.Header>{this.props.challenges.title}</Card.Header>
          <Card.Meta>Submission Detail: {this.props.challenges.submissionDetail}</Card.Meta>
          <Card.Meta>Pitch: {this.props.challenges.pitch}</Card.Meta>
          <Card.Meta>Interests: {this.props.interests}</Card.Meta>
          <Card.Description>
            {this.props.challenges.description}
          </Card.Description>
        </Card.Content>
        <Card.Content style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Link to={`/editChallenges/${this.props.challenges._id}`}>
            <Button basic color='green' size="small">
              Edit
            </Button>
          </Link>
            <Button basic color='red' size="small" onClick={() => deleteChallenge(this.props.challenges.slugID)}>
              Delete
            </Button>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ChallengeCard.propTypes = {
  challenges: PropTypes.object.isRequired,
  interests: PropTypes.string.isRequired,
};

export default withRouter(ChallengeCard);
