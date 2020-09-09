import React from "react";
import { Grid, Segment, Header, Checkbox, Icon } from "semantic-ui-react";
import { AutoForm, ErrorsField, LongTextField } from "uniforms-semantic";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import swal from "sweetalert";
import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { NavLink } from "react-router-dom";
import { SimpleSchema2Bridge } from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";
import moment from "moment";
import { userInteractionDefineMethod } from "../../api/user/UserInteractionCollection.methods";

// Create a schema to specify the structure of the data to appear in the form.
const schema = new SimpleSchema({
    typeData: { type: Array },
    "typeData.$": { type: String },
    timestamp: { type: Date },
    noChallenge: { type: String, required: false },
    difficultChallenge: { type: String, required: false },
    noTeam: { type: String, required: false },
    noTime: { type: String, required: false },
    other: { type: String, required: false }
});

/**
 * Renders the Page for deleting a user. **deprecated**
 * @memberOf ui/pages
 */
class DeleteForm extends React.Component {
    deleteAccount = () => {
        this.submit();
        this.handleOpen();
        // Meteor.users.allow({
        //     remove: function (userId, doc) {
        //         return doc && doc.userId === userId;
        //     }
        // });
        // Meteor.users.remove({ _id: this._id }, function (error, result) {
        //     if (error) {
        //         console.log("Error removing user: ", error);
        //     } else {
        //         console.log(`Number of users removed: ${result}`);
        //     }
        // });
    };

    /** On submit, insert the data.
     * @param data {Object} the results from the form.
     * @param formRef {FormRef} reference to the form.
     */
    submit(data, formRef) {
        console.log("DeleteForm.submit", data);
        const {
            noChallenge,
            difficultChallenge,
            noTeam,
            noTime,
            other
        } = data;
        const username = Meteor.user().username;
        const type = "deleteAccount";
        const timestamp = moment().toDate();
        console.log(`{ ${username}, ${type}, ${timestamp}`);
        userInteractionDefineMethod.call({
                username,
                type,
                timestamp,
                noChallenge,
                difficultChallenge,
                noTeam,
                noTime,
                other
            },
            (error) => {
                if (error) {
                    swal("Error", error.message, "error");
                    // console.error(error.message);
                } else {
                    swal("Success", "Item added successfully", "success");
                    formRef.reset();
                    // console.log('Success');
                }
            });
    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */

    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    render() {
        let fRef = null;
        const formSchema = new SimpleSchema2Bridge(schema);
        return (
            <Grid container centered>
                <Grid.Column>
                    <Header as="h2" textAlign="center">Feedback</Header>
                    <AutoForm ref={ref => {
                        fRef = ref;
                    }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
                        <Segment>
                            <Header as="h3">We&apos;re sorry to hear you&apos;re deleting your account.</Header>
                            <Header as="h4">Please provide feedback on why you&apos;re leaving
                                to improve the HACC experience for next year.</Header>
                            <br/>
                            <Grid>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Checkbox name='noChallenge' label='No challenge was interesting for me'/>
                                        <br/>
                                        <br/>
                                        <Checkbox name='difficultChallenge' label='The challenges were too hard'/>
                                        <br/>
                                        <br/>
                                        <Checkbox name='noTeam' label='Couldn&apos;t find a team I liked being on'/>
                                        <br/>
                                        <br/>
                                        <Checkbox name='toTime' label='My schedule conflicts with the HACC'/>
                                        <br/>
                                        <br/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <LongTextField name='other'/>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Button basic color='red'
                                    onClick={this.deleteAccount}
                                    value='Submit'>
                                Delete Account
                            </Button>
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

export default DeleteForm;
