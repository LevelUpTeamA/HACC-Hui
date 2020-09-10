import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import {
  AutoForm,
  BoolField,
  ErrorsField,
  NumField,
  SubmitField,
  TextField,
  SelectField,
  LongTextField
} from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import MultiSelectField from '../forms/MultiSelectField';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { stuffDefineMethod } from '../../api/stuff/StuffCollection.methods';
import { _ } from 'lodash';
import { Developers } from '../../api/user/DeveloperCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { getCollectionName } from '../../api/base/BaseCollection';
import { Challenges } from '../../api/challenge/ChallengeCollection';
import { Skills } from '../../api/skill/SkillCollection';
import { Tools } from '../../api/tool/ToolCollection';

// Create a schema to specify the structure of the data to appear in the form.
const schema = new SimpleSchema({
  username: {
    type: String,
    label: 'Username',
  },
  first: {
    type: String,
    label: 'First Name',
  },
  last: {
    type: String,
    label: 'Last Name',
  },
  demographicLevel: {
    type: String,
    label: 'Demographic Level',
  },
  lookingTeam: {
    type: Boolean,
    label: 'Looking for a team?',
  },
  skills: {
    type: Array,
    label: 'Skills',
  },
  'skills.$': {
    type: String,
  },
  tools: {
    type: Array,
    label: 'Tools'
  },
  'tools.$': {
    type: String,
  },
  challenges: {
    type: Array,
    label: 'Challenges'
  },
  'challenges.$': {
    type: String,
  },
  linkedin: {
    type: String,
    label: 'LinkedIn',
    optional: true,
  },
  github: {
    type: String,
    label: 'GitHub',
    optional: true,
  },
  website: {
    type: String,
    label: 'Website',
    optional: true,

  },
  aboutMe: {
    type: String,
    label: 'About Me',
    optional: true,
  },
});

/**
 * Renders the Page for adding stuff. **deprecated**
 * @memberOf ui/pages
 */
class UpdateProfile extends React.Component {

  /** On submit, insert the data.
   * @param data {Object} the results from the form.
   * @param formRef {FormRef} reference to the form.
   */
  submit(data, formRef) {

    const { username, first, last, demographicLevel, lookingTeam, linkedin, github, website, aboutMe,
      challenges, skills, tools } = data;
    const definitionData = {
      username, first, last, demographicLevel, lookingTeam, linkedin, github, website, aboutMe, challenges, skills, tools
    };
    // console.log(`{ ${name}, ${quantity}, ${condition}, ${owner} }`);
    defineMethod.call({ collectionName: Developers.getCollectionName(), definitionData: definitionData },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
          // console.error(error.message);
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
          // console.log('Success');
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const skillsArr = _.map(this.props.skills, 'name');
    const toolsArr = _.map(this.props.tools, 'name');
    const challengesArr = _.map(this.props.challenges, 'title');
    let fRef = null;
    const formSchema = new SimpleSchema2Bridge(schema);
    const menuStyle = {marginTop: '2em', backgroundColor: '#5C93D1' };
    return (
        <Grid container centered>
          <Grid.Column style={menuStyle}>
            <Header as="h2" textAlign="center" inverted>Update Your Profile</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField name='first' placeholer={'First Name'}/>
                  <TextField name='last' placeholer={'Last Name'}/>
                </Form.Group>
                <TextField name='username' placeholer={'Username'}/>
                <TextField name='demographicLevel'/>
                <MultiSelectField name='skills' placeholder={'Skills'}
                                  allowedValues={skillsArr} required/>
                <MultiSelectField name='tools' placeholder={'Tools'}
                                  allowedValues={toolsArr} required/>
                <MultiSelectField name='challenges' placeholder={'Challenges'}
                                  allowedValues={challengesArr} required/>
                <TextField name='linkedin' placeholer={'LinkedIn URL'}/>
                <TextField name='github' placeholer={'GitHub URL'}/>
                <TextField name='website' placeholer={'Website URL'}/>
                <LongTextField name='aboutMe'/>
                <BoolField name='lookingTeam'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default withTracker(() => {
  const subscription1 = Tools.subscribe();
  const subscription = Skills.subscribe();
  const subscription2 = Challenges.subscribe();
  const subscription3 = Developers.subscribe();
  return {
    skills: Skills.find({}).fetch(),
    tools: Tools.find({}).fetch(),
    challenges: Challenges.find({}).fetch(),
    developer: Developers.find({}).fetch(),
    ready: subscription.ready() && subscription1.ready() && subscription2.ready() && subscription3.ready(),
  };
})(UpdateProfile);