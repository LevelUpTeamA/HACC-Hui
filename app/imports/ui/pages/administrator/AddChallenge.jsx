import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'lodash';
import PropTypes from 'prop-types';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import { Challenges } from '../../../api/challenge/ChallengeCollection';
import { Interests } from '../../../api/interest/InterestCollection';
import MultiSelectField from '../../controllers/MultiSelectField';

// Create a schema to specify the structure of the data to appear in the form.
const schema = new SimpleSchema({
  title: String,
  interests: { type: Array, label: 'Interests' },
  'interests.$': { type: String },
  description: String,
  submissionDetail: String,
  pitch: String,
});

/**
 * Renders the Page for adding stuff. **deprecated**
 * @memberOf ui/pages
 */
class AddChallenge extends React.Component {

  /** On submit, insert the data.
   * @param data {Object} the results from the form.
   * @param formRef {FormRef} reference to the form.
   */
  submit(data, formRef) {
    const { title, description, interests, submissionDetail, pitch } = data;
    const interestsArr = this.props.interests;
    const interestsObj = [];
    for (let i = 0; i < interestsArr.length; i++) {
      for (let j = 0; j < interests.length; j++) {
        if (interestsArr[i].name === interests[j]) {
          interestsObj.push(interestsArr[i]._id);
        }
      }
    }
    const definitionData = { title, description, interestsObj, submissionDetail, pitch };
    const collectionName = Challenges.getCollectionName();
    defineMethod.call({ collectionName: collectionName, definitionData: definitionData },
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
    const interestsArr = _.map(this.props.interests, 'name');
    const formSchema = new SimpleSchema2Bridge(schema);
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add a challenge</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField name='title' />
                <TextField name='description' />
                <MultiSelectField name='interests' placeholder={'Interests'} allowedValues={interestsArr} required/>
                <TextField name='submissionDetail' />
                <TextField name='pitch' />
                <SubmitField value='Submit' />
                <ErrorsField />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

AddChallenge.propTypes = {
  interests: PropTypes.object,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  return {
    interests: Interests.find({}).fetch(),
  };
})(AddChallenge);
