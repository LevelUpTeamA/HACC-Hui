import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';
import { WantsToJoin } from '../../../api/team/WantToJoinCollection';
import { InterestedDevs } from '../../../api/team/InterestedDevCollection';
import { Developers } from '../../../api/user/DeveloperCollection';
import { DeveloperChallenges } from '../../../api/user/DeveloperChallengeCollection';
import { DeveloperInterests } from '../../../api/user/DeveloperInterestCollection';
import { DeveloperSkills } from '../../../api/user/DeveloperSkillCollection';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import { Teams } from '../../../api/team/TeamCollection';
import { Slugs } from '../../../api/slug/SlugCollection';

class InterestedDeveloperExampleWidget extends React.Component {
  // handleClick(e, inst) {
  //   console.log(e, inst);
  //   const collectionName = WantsToJoin.getCollectionName();
  //   const teamDoc = Teams.findDoc(inst.id);
  //   const team = Slugs.getNameFromID(teamDoc.slugID);
  //   const developer = Developers.findDoc({ userID: Meteor.userId() }).username;
  //   const definitionData = {
  //     team,
  //     developer,
  //   };
  //   console.log(collectionName, definitionData);
  //   defineMethod.call({ collectionName, definitionData }, (error) => {
  //     if (error) {
  //       console.error('Failed to define', error);
  //     }
  //   });
  //   const collectionName2 = InterestedDevs.getCollectionName();
  //   console.log(collectionName2, definitionData);
  //   defineMethod.call({ collectionName: collectionName2, definitionData }, (error) => {
  //     if (error) {
  //       console.error('Failed to define', error);
  //     }
  //   });
  // }

  render() {
    return (
        <Grid.Row columns={5}>
          <Grid.Column>
            <Header as="h3">{this.props.developers.firstName} {this.props.developers.lastName}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">{this.props.developers.username.join(',')}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">{this.props.developers.challenges.join(',')}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">{this.props.developers.skills.join(',')}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">{this.props.developers.tools.join(',')}</Header>
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
