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
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { getCollectionName } from '../../api/base/BaseCollection';
import { Challenges } from '../../api/challenge/ChallengeCollection';
import { Skills } from '../../api/skill/SkillCollection';
import { Tools } from '../../api/tool/ToolCollection';

// Create a schema to specify the structure of the data to appear in the form.
const schema = new SimpleSchema({

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
  linkedIn: {
    type: String,
    label: 'LinkedIn',
    optional: true,
  },
  gitHub: {
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

    const { challenges, skills, tools, linkedIn, gitHub, website, aboutMe, _id } = data;
    const definitionData = { _id, challenges, skills, tools, linkedIn, gitHub, website, aboutMe };
    // console.log(`{ ${name}, ${quantity}, ${condition}, ${owner} }`);
    updateMethod.call( { collectionName: Developers.getCollectionName(), definitionData: definitionData },
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
                <MultiSelectField name='skills' placeholder={'Skills'}
                                  allowedValues={skillsArr} required/>
                <MultiSelectField name='tools' placeholder={'Tools'}
                                  allowedValues={toolsArr} required/>
                <MultiSelectField name='challenges' placeholder={'Challenges'}
                                  allowedValues={challengesArr} required/>
                <TextField name='linkedIn' placeholer={'LinkedIn URL'}/>
                <TextField name='gitHub' placeholer={'GitHub URL'}/>
                <TextField name='website' placeholer={'Website URL'}/>
                <LongTextField name='aboutMe'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

UpdateProfile.propTypes = {
  doc: PropTypes.object,
  tools: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
  challenges: PropTypes.array.isRequired,
  developer: PropTypes.array.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription1 = Tools.subscribe();
  const subscription = Skills.subscribe();
  const subscription2 = Challenges.subscribe();
  const subscription3 = Developers.subscribe();
  return {
    doc: Developers.findOne(documentId),
    skills: Skills.find({}).fetch(),
    tools: Tools.find({}).fetch(),
    challenges: Challenges.find({}).fetch(),
    developer: Developers.find({}).fetch(),
    ready: subscription.ready() && subscription1.ready() && subscription2.ready() && subscription3.ready(),
  };
})(UpdateProfile);