import React from 'react';
import PropTypes from 'prop-types';
import { _ } from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header } from 'semantic-ui-react';
import { InterestedDevs } from '../../../api/team/InterestedDevCollection';
import { Developers } from '../../../api/user/DeveloperCollection';
import { DeveloperChallenges } from '../../../api/user/DeveloperChallengeCollection';
import { DeveloperSkills } from '../../../api/user/DeveloperSkillCollection';
import { DeveloperTools } from '../../../api/user/DeveloperToolCollection';
import InterestedDeveloperExampleWidget from './InterestedDeveloperExampleWidget';
import { TeamChallenges } from '../../../api/team/TeamChallengeCollection';
import { Challenges } from '../../../api/challenge/ChallengeCollection';
import { TeamSkills } from '../../../api/team/TeamSkillCollection';
import { Skills } from '../../../api/skill/SkillCollection';
import { TeamTools } from '../../../api/team/TeamToolCollection';
import { Teams } from '../../../api/team/TeamCollection';
import { Tools } from '../../../api/tool/ToolCollection'


const getDeveloperChallenges = (dev) => {
  const teamID = dev._id;
  const devChallengeDocs = DeveloperChallenges.find({ teamID }).fetch();
  const challengeTitles = devChallengeDocs.map((tc) => Challenges.findDoc(tc.challengeID).title);
  return challengeTitles;
};

const getDeveloperSkills = (team) => {
  const teamID = team._id;
  const developerSkills = DeveloperSkills.find({ teamID }).fetch();
  const skillNames = developerSkills.map((ts) => Skills.findDoc(ts.skillID).name);
  return skillNames;
};

const getDeveloperTools = (team) => {
  const teamID = team._id;
  const developerTools = DeveloperTools.find({ teamID }).fetch();
  const toolNames = developerTools.map((tt) => Tools.findDoc(tt.toolID).name);
  return toolNames;
};

class InterestedDevelopersWidget extends React.Component {
  render() {

    const universalDevs = this.props.developers;

    function getInterestedDevelopers(devs) {
      const data = [];
      for (let i = 0; i < devs.length; i++) {
        for (let j = 0; j < universalDevs.length; j++) {
          if (devs[i].developerID === universalDevs[j]._id) {
            data.push(universalDevs[j]);
          }
        }
      }
      // console.log(data);
      return data;
    }
    return (
        <Grid celled>
          <Grid.Row columns={5}>
            <Grid.Column>
              <Header>Name</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>Slack Username</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>About Me</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>Skills</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>Tools</Header>
            </Grid.Column>
          </Grid.Row>
          {getInterestedDevelopers(this.props.interestedDevs).map((developers) => <InterestedDeveloperExampleWidget
              key={developers._id} developers={developers}
              skills={getDeveloperSkills(developers._id, this.props.developerSkills)}
              tools={getDeveloperTools(developers._id, this.props.developerTools)}
              challenges={getDeveloperChallenges(developers._id, this.props.developerChallenges)}
          />)}
        </Grid>
    );
  }
}

InterestedDevelopersWidget.propTypes = {
  developerChallenges: PropTypes.array.isRequired,
  interestedDevs: PropTypes.array.isRequired,
  developerSkills: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
  developerTools: PropTypes.array.isRequired,
  challenges: PropTypes.array.isRequired,
  developers: PropTypes.array.isRequired,
  tools: PropTypes.array.isRequired,
};

export default withTracker(() => {
  console.log(InterestedDevs.find({}).fetch());
  return {
    developers: Developers.find({}).fetch(),
    developerChallenges: DeveloperChallenges.find({}).fetch(),
    developerSkills: DeveloperSkills.find({}).fetch(),
    developerTools: DeveloperTools.find({}).fetch(),
    interestedDevs: InterestedDevs.find({}).fetch(),
    skills: Skills.find({}).fetch(),
    challenges: Challenges.find({}).fetch(),
    tools: Tools.find({}).fetch(),
  };
})(InterestedDevelopersWidget);
