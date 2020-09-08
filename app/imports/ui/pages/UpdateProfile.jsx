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
import { withTracker } from 'meteor/react-meteor-data';
import MultiSelectField from '../forms/MultiSelectField';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { stuffDefineMethod } from '../../api/stuff/StuffCollection.methods';
import {Skills} from '../../api/skill/SkillCollection';

// Create a schema to specify the structure of the data to appear in the form.
const schema = new SimpleSchema({
  skills: {
    type: Array,
    label: 'Skills',
  },
  'skills.$': {
    type: String,
    allowedValues: ['Videography', 'User Interface Design', 'Database Management'],
  },
  tools: {
    type: Array,
    label: 'Tools'
  },
  'tools.$': {
    type: String,
    allowedValues: ['JavaScript', 'Python', 'Java', 'C#', 'C', 'C++', 'Ruby']
  },
  challenges: {
    type: Array,
    label: 'Challenges'
  },
  'challenges.$': {
    type: String,
    allowedValues: ['Sustainability', 'Green Energy']
  },
  linkedin: {
    type: String,
    label: 'LinkedIn',
  },
  github: {
    type: String,
    label: 'GitHub',
  },
  website: {
    type: String,
  },
  aboutMe: {
    type: String,
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
    // console.log('AddStuff.submit', data);
    const { skills, tools, challenges, linkedin, github, website, aboutMe} = data;
    const owner = Meteor.user().username;
    // console.log(`{ ${name}, ${quantity}, ${condition}, ${owner} }`);
    stuffDefineMethod.call({ skills, tools, challenges, linkedin, github, website, aboutMe },
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
    let fRef = null;
    const formSchema = new SimpleSchema2Bridge(schema);
    const menuStyle = {marginTop: '2em', backgroundColor: '#5C93D1' };
    return (
        <Grid container centered>
          <Grid.Column style={menuStyle}>
            <Header as="h2" textAlign="center" inverted>Update Your Profile</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <MultiSelectField name='skills' placeholder={'Skills'} required/>
                <MultiSelectField name='tools' placeholder={'Tools'} required/>
                <MultiSelectField name='challenges' placeholder={'Challenges'} required/>
                <TextField name='linkedin' placeholer={'LinkedIn URL'}/>
                <TextField name='github' placeholer={'GitHub URL'}/>
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

export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
/*  const sub1 = Meteor.subscribe();
  return {
    ready: sub1.ready(),
  }*/;
})(UpdateProfile);