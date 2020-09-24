import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Grid, Header, Container } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import InterestedDeveloperExampleWidget from './InterestedDeveloperExampleWidget';
import { DeveloperSkills } from '../../../api/user/DeveloperSkillCollection';
import { Skills } from '../../../api/skill/SkillCollection';
import { DeveloperTools } from '../../../api/user/DeveloperToolCollection';
import { Tools } from '../../../api/tool/ToolCollection';
import { InterestedDevs } from '../../../api/team/InterestedDevCollection';
import { Interests } from '../../../api/interest/InterestCollection';
import { Developers } from '../../../api/user/DeveloperCollection';
import { DeveloperInterests } from '../../../api/user/DeveloperInterestCollection';
import { Challenges } from '../../../api/challenge/ChallengeCollection';
import { DeveloperChallenges } from '../../../api/user/DeveloperChallengeCollection';
import { Teams } from '../../../api/team/TeamCollection';

const getInterestedTeam = (interestedDevs) => {
  const developerID = interestedDevs._id;
  let teamTitles = '';
  const interestedDevsDocs = InterestedDevs.find({ developerID }).fetch();
  teamTitles = interestedDevsDocs.map((tc) => Teams.findDoc(tc.teamID).name);
  return teamTitles.join(', ');
};

const getDeveloperSkills = (interestedDevs) => {
  const developerID = interestedDevs._id;
  let skillTitles = '';
  const developerSkillsDocs = DeveloperSkills.find({ developerID }).fetch();
  skillTitles = developerSkillsDocs.map((ts) => Skills.findDoc(ts.skillID).title);
  return skillTitles.join(', ');
};

const getDeveloperTools = (interestedDevs) => {
  const developerID = interestedDevs._id;
  let toolTitles = '';
  const developerToolsDocs = DeveloperTools.find({ developerID }).fetch();
  toolTitles = developerToolsDocs.map((tt) => Tools.findDoc(tt.toolID).title);
  return toolTitles.join(', ');
};

const getDeveloperInterests = (interestedDevs) => {
  const developerID = interestedDevs._id;
  let interestTitles = '';
  const developerInterestsDocs = DeveloperInterests.find({ developerID }).fetch();
  interestTitles = developerInterestsDocs.map((ti) => Interests.findDoc(ti.interestID).name);
  return interestTitles.join(', ');
};

const getDeveloperChallenges = (interestedDevs) => {
  const developerID = interestedDevs._id;
  let challengeTitles = '';
  const developerChallengesDocs = DeveloperChallenges.find({ developerID }).fetch();
  challengeTitles = developerChallengesDocs.map((tc) => Challenges.findDoc(tc.challengeID).title);
  return challengeTitles.join(', ');
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
      return data;
    }
    return (
        <Container>
          {getInterestedDevelopers(this.props.interestedDevs)
                .map((developers) => (
                    <InterestedDeveloperExampleWidget
                        key={developers._id}
                        developer={developers}
                        interestedTeam={getInterestedTeam(developers)}
                        developerSkills={getDeveloperSkills(developers)}
                        developerTools={getDeveloperTools(developers)}
                        developerInterests={getDeveloperInterests(developers)}
                        developerChallenges={getDeveloperChallenges(developers)}
                    />
                ))}
        </Container>
    );
  }
}

InterestedDevelopersWidget.propTypes = {
  developers: PropTypes.array.isRequired,
  interestedDevs: PropTypes.arrayOf(
      PropTypes.object,
  ),
};

export default withTracker(() => {
  const interestedDevs = InterestedDevs.find({}).fetch();
  const developers = Developers.find({}).fetch();
  return {
    interestedDevs,
    developers,

  };
})(InterestedDevelopersWidget);