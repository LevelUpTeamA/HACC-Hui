import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Grid, Segment, Header, Icon } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField } from 'uniforms-semantic';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import { NavLink } from 'react-router-dom';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Developers } from '../../api/user/DeveloperCollection';
import { userInteractionDefineMethod } from '../../api/user/UserInteractionCollection.methods';
import { removeItMethod } from '../../api/base/BaseCollection.methods';
import { userInteractionTypes } from '../../api/user/UserInteractionCollection';

/**
 * Renders the Page for deleting a user. **deprecated**
 * @memberOf ui/pages
 */
class DeleteForm extends React.Component {

    /** On submit, insert the data.
     * @param data {Object} the results from the form.
     * @param formRef {FormRef} reference to the form.
     */
    submit(data) {
      console.log('DeleteForm.submit', data);
      const username = this.props.doc.username;
        const type = userInteractionTypes.deleteAccount;
        const typeData = [];
        typeData.push(data.feedback, data.other);
        const timestamp = moment().toDate();
        const userInteraction = {
            username,
            type,
            typeData,
          timestamp,
        };
        userInteractionDefineMethod.call(userInteraction);
        const instance = this.props.doc._id;
        removeItMethod.call({ Developers, instance });
    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */

    state = { modalOpen: false }

    handleChange = (e, { value }) => this.setState({ value });

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    render() {
        const reasons = [
          'No challenge was interesting for me',
          'The challenges were too hard',
          "Couldn't find a team I liked being on",
          'My schedule conflicts with the HACC',
          'Other',
        ];
        // Create a schema to specify the structure of the data to appear in the form.
        const schema = new SimpleSchema({
            feedback: {
                type: String,
                allowedValues: reasons,
              defaultValue: 'Other',
            },
          other: { type: String, required: false },
        });
        const formSchema = new SimpleSchema2Bridge(schema);
        return (
            <Grid container centered>
                <Grid.Column>
                    <Header as="h2" textAlign="center">Feedback</Header>
                  <AutoForm schema={formSchema} onSubmit={data => {
                    // eslint-disable-next-line
                    if (window.confirm("Are you sure you wish to delete your account?")) this.submit(data);
                  }}>
                        <Segment>
                            <Header as="h3">We&apos;re sorry to hear you&apos;re deleting your account.</Header>
                            <Header as="h4">Please provide feedback on why you&apos;re leaving
                                to improve the HACC experience for next year.</Header>
                            <br/>
                            <Grid>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <SelectField name='feedback'/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <LongTextField name='other'/>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                          {/*<Button basic color='red'*/}
                          {/*        onClick={this.submit}*/}
                          {/*        value='Submit'>*/}
                          {/*    Delete Account*/}
                          {/*</Button>*/}
                          <SubmitField value='Delete Account'/>

                          <Modal
                                open={this.state.modalOpen}
                                onClose={this.handleClose}>
                                <Header>
                                    <Icon color='green' name='checkmark'/>
                                    Account deleted!
                                </Header>
                                <Modal.Content>
                                    <h3>We hope to see you again!</h3>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='grey' as={NavLink} exact to="/"
                                        // onClick={Meteor.logout()}
                                    >
                                        Back to homepage
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                            <ErrorsField/>
                        </Segment>
                    </AutoForm>
                </Grid.Column>
            </Grid>
        );
    }
}

/**
 * Require the presence of a DeleteForm document in the props object. Uniforms adds 'model' to the props, which we
 * use.
 */
DeleteForm.propTypes = {
    doc: PropTypes.object,
    model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
    // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
    const documentId = match.params._id;
    // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Developers');
    return {
        doc: Developers.findOne(documentId),
      ready: subscription.ready(),
    };
})(DeleteForm);
