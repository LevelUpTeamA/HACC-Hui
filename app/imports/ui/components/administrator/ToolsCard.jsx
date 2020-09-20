import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { removeItMethod } from '../../../api/base/BaseCollection.methods';
import { Tools } from '../../../api/tool/ToolCollection';

class ToolsCard extends React.Component {
  render() {
    function deleteTool(id) {
      /* eslint-disable-next-line */
      if (confirm('Do you really want to remove this Tool?')) {
        removeItMethod.call({
          collectionName: Tools.getCollectionName(),
          instance: Tools.getID(id) }, (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Tool deleted successfully', 'success')));
      }
    }
    return (
      <Card fluid={true}>
        <Card.Content>
          <Card.Header>{this.props.tools.name}</Card.Header>
          <Card.Description>
            {this.props.tools.description}
          </Card.Description>
        </Card.Content>
        <Card.Content style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Link to={`/editTools/${this.props.tools._id}`}>
            <Button basic color='green' size="small">
              Edit
            </Button>
          </Link>
            <Button basic color='red' size="small" nClick={() => deleteTool(this.props.tools.slugID)}>
              Delete
            </Button>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ToolsCard.propTypes = {
  tools: PropTypes.object.isRequired,
};

export default withRouter(ToolsCard);
