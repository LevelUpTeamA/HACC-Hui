import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';

class TeamCard extends React.Component {
  render() {
    return (
        <Grid celled>
          <Grid.Row columns={5}>
            <Grid.Column>
              <Header>Name</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>Challenges</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>Desired Skills</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>Desired Tools</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>Join?</Header>
            </Grid.Column>
          </Grid.Row>
          {this.props.teams.map((team) => (
              <ListTeamExampleWidget key={team._id}
                                     team={team}
                                     teamChallenges={getTeamChallenges(team)}
                                     teamSkills={getTeamSkills(team)}
                                     teamTools={getTeamTools(team)}
              />
          ))}
        </Grid>
    );
  }
}

TeamCard.propTypes = {
  teams: PropTypes.arrayOf(
      PropTypes.object,
  ),
};

export default TeamFinderCard
