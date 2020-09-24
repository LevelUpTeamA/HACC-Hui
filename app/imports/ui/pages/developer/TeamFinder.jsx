import React from 'react';
import { Table, Header, Loader, Grid, Button, Dropdown } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tools } from '../../../api/tool/ToolCollection';
import { Skills } from '../../../api/skill/SkillCollection';
import { Challenges } from '../../../api/challenge/ChallengeCollection';
import ChallengesAdmin from '../../components/administrator/ChallengesAdmin';
import SkillsAdmin from '../../components/administrator/SkillsAdmin';
import ToolsAdmin from '../../components/administrator/ToolsAdmin';
import { ROUTES } from '../../../startup/client/route-constants';
import { TeamChallenges } from '../../../api/team/TeamChallengeCollection';
import { TeamSkills } from '../../../api/team/TeamSkillCollection';
import { TeamTools } from '../../../api/team/TeamToolCollection';
// import { removeItMethod } from '../../api/base/BaseCollection.methods';
// import swal from 'sweetalert';

/**
 * **Deprecated**
 *
 * Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row.
 * @memberOf ui/pages
 */
class TeamFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      challenges: [],
      tools: [],
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  getTeamChallenges = (team) => {
    const teamID = team._id;
    const teamChallengeDocs = TeamChallenges.find({ teamID }).fetch();
    const challengeTitles = teamChallengeDocs.map((tc) => Challenges.findDoc(tc.challengeID).title);
    return challengeTitles;
  };

  getTeamSkills = (team) => {
    const teamID = team._id;
    const teamSkills = TeamSkills.find({ teamID }).fetch();
    const skillNames = teamSkills.map((ts) => Skills.findDoc(ts.skillID).name);
    return skillNames;
  };

  getTeamTools = (team) => {
    const teamID = team._id;
    const teamTools = TeamTools.find({ teamID }).fetch();
    const toolNames = teamTools.map((tt) => Tools.findDoc(tt.toolID).name);
    return toolNames;
  };

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div>
          <Header as="h1" textAlign="center">Find a Team</Header>
          <div className="ui search icon input">
            <input className="prompt" type="text" placeholder="Team Search"></input>
            <i className="search icon"></i>
            <div className="results"></div>
          </div>
          <Grid divided>
            <Grid.Row>
              <Grid.Column style = {{width: '33%'}}>
                <Header as="h2" textAlign="center">Challenges</Header>
                <select className="ui search dropdown" style={{width:'100%', textAlign:'center'}}>
                  <option value="">Challenges</option>
                </select>
                <Table>
                  <Table.Body>
                    {/*{this.props.challenges.map((challenges => <ChallengesAdmin key={challenges._id}*/}
                    {/*                                                           challenges={challenges} />))}*/}
                  </Table.Body>
                </Table>
              </Grid.Column>

              <Grid.Column style = {{width: '33%'}}>
                <Header as="h2" textAlign="center">Skills</Header>
                <select className="ui search dropdown" style={{width:'100%', textAlign:'center'}}>
                  <option value="">Skills</option>
                </select>
                <Table>
                  <Table.Body>
                    {/*{this.props.skills.map((skills => <SkillsAdmin key={skills._id} skills={skills} />))}*/}
                  </Table.Body>
                </Table>
              </Grid.Column>

              <Grid.Column style = {{width: '33%'}}>
                <Header as="h2" textAlign="center">Tools</Header>
                <select className="ui search dropdown" style={{width:'100%', textAlign:'center'}}>
                  <option value="">Tools</option>
                </select>
                <Table>
                  <Table.Body>
                    {/*{this.props.tools.map((tools => <ToolsAdmin key={tools._id} tools={tools} />))}*/}
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

    );
  }
}

// Require an array of Stuff documents in the props.
TeamFinder.propTypes = {
  tools: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
  challenges: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = Challenges.subscribe();
  const subscription2 = Skills.subscribe();
  const subscription3 = Tools.subscribe();
  return {
    challenges: Challenges.find({}).fetch(),
    skills: Skills.find({}).fetch(),
    tools: Tools.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(TeamFinder);
