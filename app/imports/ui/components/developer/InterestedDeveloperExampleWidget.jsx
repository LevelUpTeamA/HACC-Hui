import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';

class InterestedDeveloperExampleWidget extends React.Component {

  render() {
    return (
        <Grid.Row columns={5}>
          <Grid.Column>
            <Header as="h3">{this.props.developers.firstName} {this.props.developers.lastName}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">{this.props.developers.username}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">{this.props.developers.challenges}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">{this.props.skills.map((skill) => <p key={skill}>
              {skill.name}: {skill.level}</p>)}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">{this.props.developers.tools}</Header>
          </Grid.Column>
        </Grid.Row>
    );
  }
}

InterestedDeveloperExampleWidget.propTypes = {
  team: PropTypes.object,
  skills: PropTypes.arrayOf(
      PropTypes.object,
  ),
  tools: PropTypes.arrayOf(
      PropTypes.object,
  ),
  challenges: PropTypes.arrayOf(
      PropTypes.object,
  ),
  developers: PropTypes.object.isRequired,
};

export default InterestedDeveloperExampleWidget;
