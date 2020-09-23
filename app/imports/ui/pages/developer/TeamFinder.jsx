import React from 'react';
import { Table, Header, Loader, Grid, Button, Divider, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Teams } from '../../../api/team/TeamCollection';
import { TeamSkills } from '../../../api/team/TeamSkillCollection';
import { TeamChallenges } from '../../../api/team/TeamChallengeCollection';
import { TeamTools } from '../../../api/team/TeamToolCollection';
import { TeamDeveloper } from '../../../api/team/TeamDeveloperCollection';
import { Tools } from '../../../api/tool/ToolCollection';
import { Skills } from '../../../api/skill/SkillCollection';
import { Challenges } from '../../../api/challenge/ChallengeCollection';
// import ChallengesAdmin from '../../components/administrator/ChallengesAdmin';
// import SkillsAdmin from '../../components/administrator/SkillsAdmin';
// import ToolsAdmin from '../../components/administrator/ToolsAdmin';
import { ROUTES } from '../../../startup/client/route-constants';

/**
 * Renders the Page for adding stuff. **deprecated**
 * @memberOf ui/pages
 */
class TeamFinder extends React.Component {

  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    console.log(Teams.dumpAll());
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    let fRef = null;
    const formSchema = new SimpleSchema2Bridge(schema);
    const challengeArr = _.map(this.props.challenges, 'title');
    const skillArr = _.map(this.props.skills, 'name');
    const toolArr = _.map(this.props.tools, 'name');

    return (
        <Grid container centered>
          <Grid.Column>
            <Divider hidden/>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}
                      style={{
                        paddingBottom: '40px',
                      }}>
              <Segment style={{
                borderRadius: '10px',
                backgroundColor: '#5C93D1',
              }} className={'createTeam'}>
                <Grid columns={1} style={{ paddingTop: '20px' }}>
                  <Grid.Column style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                    <Header as="h2" textAlign="center" inverted>Team Information</Header>
                    <Grid className='doubleLine'>
                      <TextField name='name'/>
                      <RadioField
                          name='open'
                          inline
                      >
                      </RadioField>
                    </Grid>
                    <TextField name='image' placeholder={'Team Image URL'}/>
                    <LongTextField name='description'/>
                    <MultiSelectField name='challenges' placeholder={'Challenges'}
                                      allowedValues={challengeArr} required/>
                    <MultiSelectField name='skills' placeholder={'Skills'}
                                      allowedValues={skillArr} required/>
                    <MultiSelectField name='tools' placeholder={'Toolsets'}
                                      allowedValues={toolArr} required/>
                  </Grid.Column>
                </Grid>
                <div align='center'>
                  <SubmitField value='Submit'
                               style={{
                                 color: 'white', backgroundColor: '#dd000a',
                                 margin: '20px 0px',
                               }}/>
                </div>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

TeamFinder.propTypes = {
  challenges: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
  tools: PropTypes.array.isRequired,
  developers: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,

};

export default withTracker(() => {
  const subscriptionChallenges = Challenges.subscribe();
  const subscriptionSkills = Skills.subscribe();
  const subscriptionTools = Tools.subscribe();
  const subscriptionDevelopers = Developers.subscribe();

  return {
    challenges: Challenges.find({}).fetch(),
    skills: Skills.find({}).fetch(),
    tools: Tools.find({}).fetch(),
    developers: Developers.find({}).fetch(),
    // eslint-disable-next-line max-len
    ready: subscriptionChallenges.ready() && subscriptionSkills.ready() && subscriptionTools.ready() && subscriptionDevelopers,
  };
})(TeamFinder);

