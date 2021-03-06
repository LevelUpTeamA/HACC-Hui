import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Header } from 'semantic-ui-react';
import { WantsToJoin } from '../../../api/team/WantToJoinCollection';
import { Developers } from '../../../api/user/DeveloperCollection';
import { removeItMethod } from '../../../api/base/BaseCollection.methods';
import { Teams } from '../../../api/team/TeamCollection';
import { Slugs } from '../../../api/slug/SlugCollection';

class ListTeamExampleWidget extends React.Component {
  handleClick(e, inst) {
    console.log(e, inst);
    const collectionName = Teams.getCollectionName();
    const teamDoc = Teams.findDoc(inst.id);
    const team = Slugs.getNameFromID(teamDoc.slugID);
    const developer = Developers.findDoc({ userID: Meteor.userId() }).username;
    const instance = this.props.doc._id;
    const definitionData = {
      team,
      developer,
    };
    console.log( collectionName, instance );
    removeItMethod.call({ collectionName, instance }, (error) => {
      if (error) {
        console.error('Failed to define', error);
      }
    });
  }

  render() {
    return (
        <Grid.Row columns={5}>
          <Grid.Column>
            <Header as="h3">{this.props.team.name}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">{this.props.teamChallenges.join(',')}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">{this.props.teamSkills.join(',')}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">{this.props.teamTools.join(',')}</Header>
          </Grid.Column>
          <Grid.Column>
            <Button id={this.props.team._id} color="red" onClick={this.handleClick}>Remove</Button>
          </Grid.Column>
        </Grid.Row>
    );
  }
}

ListTeamExampleWidget.propTypes = {
  team: PropTypes.object,
  teamChallenges: PropTypes.arrayOf(
      PropTypes.string,
  ),
  teamSkills: PropTypes.arrayOf(
      PropTypes.string,
  ),
  teamTools: PropTypes.arrayOf(
      PropTypes.string,
  ),
};

export default ListTeamExampleWidget;
