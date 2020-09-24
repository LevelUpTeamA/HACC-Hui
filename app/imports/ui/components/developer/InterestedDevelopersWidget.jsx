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
  const dID = interestedDevs.teamID;
  const teamList = Teams.find({}).fetch();
  let team = '';
  for (const key in teamList) {
    if (teamList[key]._id === dID) {
      team = teamList[key].name;
    }
  }
  return team;
};

const getDeveloperEducation = (interestedDevs) => {
  const dID = interestedDevs.developerID;
  const developerList = Developers.find({}).fetch();
  let developerEducation = '';
  for (const key in developerList) {
    if (developerList[key]._id === dID) {
      developerEducation = developerList[key].demographicLevel;
    }
  }
  return developerEducation;
};

const getDeveloperSkills = (interestedDevs) => {
  let dID = interestedDevs.developerID;
  const developerList = Developers.find({}).fetch();
  let skillTitles = '';
  for (const key in developerList) {
    if (developerList[key]._id === dID) {
      dID = developerList[key]._id;
      const developerSkillsDocs = DeveloperSkills.find({ dID }).fetch();
      skillTitles = developerSkillsDocs.map((tc) => Skills.findDoc(tc.skillID).name);
    }
  }
  return skillTitles;
};

const getDeveloperTools = (interestedDevs) => {
  let dID = interestedDevs.developerID;
  const developerList = Developers.find({}).fetch();
  let toolTitles = '';
  for (const key in developerList) {
    if (developerList[key]._id === dID) {
      dID = developerList[key]._id;
      const developerToolsDocs = DeveloperTools.find({ dID }).fetch();
      toolTitles = developerToolsDocs.map((tc) => Tools.findDoc(tc.toolID).name);
    }
  }
  return toolTitles;
};

const getDeveloperInterests = (interestedDevs) => {
  let dID = interestedDevs.developerID;
  const developerList = Developers.find({}).fetch();
  let interestTitles = '';
  for (const key in developerList) {
    if (developerList[key]._id === dID) {
      dID = developerList[key]._id;
      const developerInterestsDocs = DeveloperInterests.find({ dID }).fetch();
      interestTitles = developerInterestsDocs.map((tc) => Interests.findDoc(tc.interestID).name);
    }
  }
  return interestTitles;
};

const getDeveloperChallenges = (interestedDevs) => {
  let dID = interestedDevs.developerID;
  const developerList = Developers.find({}).fetch();
  let challengeTitles = '';
  for (const key in developerList) {
    if (developerList[key]._id === dID) {
      dID = developerList[key]._id;
      const developerChallengesDocs = DeveloperChallenges.find({ dID }).fetch();
      challengeTitles = developerChallengesDocs.map((tc) => Challenges.findDoc(tc.challengeID).title);
    }
  }
  return challengeTitles;
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
                        developerEducation={getDeveloperEducation(developers)}
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