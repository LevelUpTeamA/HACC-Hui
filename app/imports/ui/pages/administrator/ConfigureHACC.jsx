import React from 'react';
import { Container, Header, Loader, Grid, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tools } from '../../../api/tool/ToolCollection';
import { Skills } from '../../../api/skill/SkillCollection';
import { Challenges } from '../../../api/challenge/ChallengeCollection';
import SkillsCard from '../../components/administrator/SkillsCard';
import ToolsCard from '../../components/administrator/ToolsCard';
import { ROUTES } from '../../../startup/client/route-constants';
import ChallengeCard from '../../components/administrator/ChallengeCard';
import { ChallengeInterests } from '../../../api/challenge/ChallengeInterestCollection';
import { Interests } from '../../../api/interest/InterestCollection';
// import { removeItMethod } from '../../api/base/BaseCollection.methods';
// import swal from 'sweetalert';

/**
 * **Deprecated**
 *
 * Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row.
 * @memberOf ui/pages
 */
class ConfigureHACC extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div>
          <Header as="h1" textAlign="center">Configure the HACC</Header>
          <Grid divided>
            <Grid.Row centered>
              <Grid.Column width={14} centered>
                <Container style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
                  <Header as="h2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>Challenges</Header>
                  <Button as={NavLink} activeClassName="active" exact to={ROUTES.ADD_CHALLENGE} key='addChallenge'
                          size='mini' style={{ height: '50%', marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>+</Button>
                </Container>
                <Container>
                  {this.props.challenges.map((challenge) => {
                    const interestsArray = this.props.challengeInterests;
                    const chosenInterestArray = interestsArray.filter((item) => item.challengeID === challenge._id);
                    const challengeInterestIDs = chosenInterestArray.map((item) => item.interestID);
                    const interestsArr = this.props.interests;
                    const interestsObj = [];
                    for (let i = 0; i < interestsArr.length; i++) {
                      for (let j = 0; j < challengeInterestIDs.length; j++) {
                        if (interestsArr[i]._id === challengeInterestIDs[j]) {
                          interestsObj.push(interestsArr[i].name);
                        }
                      }
                    }
                    const interestsString = interestsObj.join(' ');
                    return <ChallengeCard key={challenge._id} challenges={challenge} interests={ interestsString }/>;
                  })}
                </Container>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width={14}>
                <Container style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
                  <Header as="h2" style={{ flex: 'display', alignItems: 'center', justifyContent: 'center' }}>Skills</Header>
                  <Button as={NavLink} activeClassName="active" exact to={ROUTES.ADD_SKILL} key='addChallenge'
                          size='small' style={{ height: '50%', marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>+</Button>
                </Container>

                <Container>
                  {this.props.skills.map((skills => <SkillsCard key={skills._id} skills={skills} />))}
                </Container>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width={14}>
                <Container style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
                  <Header as="h2" style={{ flex: 'display', alignItems: 'center', justifyContent: 'center' }}>Tools</Header>
                  <Button as={NavLink} activeClassName="active" exact to={ROUTES.ADD_TOOL} key='addChallenge'
                          size='small' style={{ height: '50%', marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>+</Button>
                </Container>

                <Container>
                  {this.props.tools.map((tools => <ToolsCard
                      key={tools._id} tools={tools} />))}
                </Container>

              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

    );
  }
}

// Require an array of Stuff documents in the props.
ConfigureHACC.propTypes = {
  tools: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
  challenges: PropTypes.array.isRequired,
  challengeInterests: PropTypes.array.isRequired,
  interests: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = Challenges.subscribe();
  const subscription2 = Skills.subscribe();
  const subscription3 = Tools.subscribe();
  return {
    challenges: Challenges.find({}).fetch(),
    challengeInterests: ChallengeInterests.find({}).fetch(),
    interests: Interests.find({}).fetch(),
    skills: Skills.find({}).fetch(),
    tools: Tools.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(ConfigureHACC);
