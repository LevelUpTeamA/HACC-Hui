import React from 'react';
import { Grid, Segment, Header, Divider } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  SubmitField,
  TextField,
  LongTextField,
  HiddenField,
} from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import MultiSelectField from '../controllers/MultiSelectField';
import RadioField from '../controllers/RadioField';
import { Teams } from '../../api/team/TeamCollection';

// Create a schema to specify the structure of the data to appear in the form.
const schema = new SimpleSchema({
  availability: {
    type: String,
    allowedValues: ['Open', 'Close'],
  },
  teamName: String,
  image: String,
  challenges: { type: Array, label: 'Challenges' },
  'challenges.$': { type: String, allowedValues: ['Sustainability', 'Green Energy'] },
  skills: { type: Array, label: 'Skills' },
  'skills.$': { type: String, allowedValues: ['React', 'Javascript'] },
  tools: { type: Array, label: 'Toolsets' },
  'tools.$': { type: String, allowedValues: ['Graphic Design', 'Photoshop'] },
  description: String,
  owner: String,
});

/**
 * Renders the Page for adding stuff. **deprecated**
 * @memberOf ui/pages
 */
class TeamCreation extends React.Component {

  /** On submit, insert the data.
   * @param data {Object} the results from the form.
   * @param formRef {FormRef} reference to the form.
   */
  submit(data, formRef) {

    console.log('CreateTeam.submit', data);

    const {
      teamName, description, gitHubRepo = '', devPostPage = '',
      owner, open = true, challenges, skills, tools, developers = []
    } = data;

    const docID = Teams.define({
      teamName, description, open, owner, gitHubRepo,
      devPostPage, challenges, tools, skills
    });

    // const docID = Teams.define({
    //     teamName, description, gitHubRepo, devPostPage,
    //     owner, open, challenges, skills, tools, developers,
    //   },
    //     (error) => {
    //       if (error) {
    //         swal('Error', error.message, 'error');
    //          console.error(error.message);
    //       } else {
    //         swal('Success', 'Item added successfully', 'success');
    //         formRef.reset();
    //          console.log('Success');
    //       }
    //     });
    console.log(docID);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const formSchema = new SimpleSchema2Bridge(schema);
    return (
          <Grid container centered>
            <Grid.Column>
              <Divider hidden/>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}
                        style={{
                          paddingBottom: '4rem',
                        }}>
                <Segment style={{
                  borderRadius: '1rem',
                  backgroundColor: '#5C93D1',
                }} className={'createTeam'}>
                  <Grid columns={1} style={{ paddingTop: '2rem' }}>
                    <Grid.Column style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
                      <Header as="h2" textAlign="center" inverted>Team Information</Header>
                      <Grid className='doubleLine'>
                        <TextField name='teamName'/>
                        <RadioField
                            name='availability'
                            inline
                        >
                        </RadioField>
                      </Grid>
                      <TextField name='image' placeholder={'Team Image URL'}/>
                      <LongTextField name='description'/>
                      <MultiSelectField name='challenges' placeholder={'Challenges'} required/>
                      <MultiSelectField name='skills' placeholder={'Skills'} required/>
                      <MultiSelectField name='tools' placeholder={'Toolsets'} required/>
                    </Grid.Column>
                  </Grid>
                  <div align='center'>
                    <SubmitField value='Submit'
                                 style={{
                                   color: 'white', backgroundColor: '#dd000a',
                                   margin: '2rem 0rem',
                                 }}/>
                  </div>
                  <HiddenField
                      name='owner'
                      value={Meteor.user().username}
                  />
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
    );
  }
}

export default TeamCreation;
