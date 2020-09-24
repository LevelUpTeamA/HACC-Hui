import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { removeItMethod } from '../../../api/base/BaseCollection.methods';
import { Skills } from '../../../api/skill/SkillCollection';

class SkillsCard extends React.Component {
  render() {
    function deleteSkill(id) {
      /* eslint-disable-next-line */
      if (confirm('Do you really want to remove this Skill?')) {
        removeItMethod.call({
          collectionName: Skills.getCollectionName(),
          instance: Skills.getID(id) }, (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Skill deleted successfully', 'success')));
      }
    }
    return (
      <Card fluid={true}>
        <Card.Content>
          <Card.Header>{this.props.skills.name}</Card.Header>
          <Card.Description>
            {this.props.skills.description}
          </Card.Description>
        </Card.Content>
        <Card.Content style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Link to={`/editSkills/${this.props.skills._id}`}>
            <Button basic color='green' size="small">
              Edit
            </Button>
          </Link>
            <Button basic color='red' size="small" onClick={() => deleteSkill(this.props.skills.slugID)}>
              Delete
            </Button>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
SkillsCard.propTypes = {
  skills: PropTypes.object.isRequired,
};

export default withRouter(SkillsCard);
