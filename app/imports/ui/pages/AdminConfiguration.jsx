import React from 'react';
import { Container, Table, Loader, Button, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Challenges } from '../../api/challenge/ChallengeCollection';
import { Skills } from '../../api/skill/SkillCollection';
import { Tools } from '../../api/tool/ToolCollection';
import ChallengesAdmin from '../components/ChallengesAdmin';
import SkillsAdmin from '../components/SkillsAdmin';
import ToolsAdmin from '../components/ToolsAdmin';

/**
 * **Deprecated**
 *
 * Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row.
 * @memberOf ui/pages
 */
class AdminConfiguration extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Grid style={{ flexDirection: 'row', margin: 15, justifyContent: 'center', alignItems: 'center' }}>
            <b style={{ fontSize: 25 }}>Challenges</b>
            <Button>Edit</Button>
          </Grid>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Interests</Table.HeaderCell>
                <Table.HeaderCell>Submission Detail</Table.HeaderCell>
                <Table.HeaderCell>Pitch</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.challenges.map((challenge) => <ChallengesAdmin key={challenge._id} challenge={challenge} />)}
            </Table.Body>
          </Table>
          <Grid style={{ flexDirection: 'row', margin: 15, justifyContent: 'center', alignItems: 'center' }}>
            <b style={{ fontSize: 25 }}>Skills</b>
            <Button>Edit</Button>
          </Grid>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.skills.map((skill) => <SkillsAdmin key={skill._id} skill={skill} />)}
            </Table.Body>
          </Table>
          <Grid style={{ flexDirection: 'row', margin: 15, justifyContent: 'center', alignItems: 'center' }}>
            <b style={{ fontSize: 25 }}>Tools</b>
            <Button>Edit</Button>
          </Grid>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.tools.map((tool) => <ToolsAdmin key={tool._id} tool={tool} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
AdminConfiguration.propTypes = {
  challenges: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
  tools: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Challenges.subscribe();
  return {
    challenges: Challenges.find({}).fetch(),
    skills: Skills.find({}).fetch(),
    tools: Tools.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AdminConfiguration);