import React from "react";
import { Grid, Segment, Header, Radio, Checkbox } from "semantic-ui-react";
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField, LongTextField } from "uniforms-semantic";
import swal from "sweetalert";
import { Meteor } from "meteor/meteor";
import { SimpleSchema2Bridge } from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";
import { stuffDefineMethod } from "../../api/stuff/StuffCollection.methods";

// Create a schema to specify the structure of the data to appear in the form.
const schema = new SimpleSchema({
    noChallenge: { type: Checkbox, required: false },
    difficultChallenge: { type: Checkbox, required: false },
    noTeam: { type: Checkbox, required: false },
    noTime: { type: Checkbox, required: false },
    other: { type: String, required: false }
});

/**
 * Renders the Page for adding stuff. **deprecated**
 * @memberOf ui/pages
 */
class DeleteForm extends React.Component {

    /** On submit, insert the data.
     * @param data {Object} the results from the form.
     * @param formRef {FormRef} reference to the form.
     */
    submit(data, formRef) {
        // console.log('DeleteForm.submit', data);
        const { noChallenge, difficultChallenge, noTeam, noTime, other } = data;
        const owner = Meteor.user().username;
        // console.log(`{ ${name}, ${quantity}, ${condition}, ${owner} }`);
        stuffDefineMethod.call({ noChallenge, difficultChallenge, noTeam, noTime, other, owner },
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

    state = {};

    handleChange = (e, { value }) => this.setState({ value });

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
                                        <Checkbox name='toTime' label='My schedule conflicts with the HACC schedule'/>
                                        <br/>
                                        <br/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <LongTextField name='other'/>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <SubmitField value=' Submit'/>
                            <ErrorsField/>
                        </Segment>
                    </AutoForm>
                </Grid.Column>
            </Grid>
        );
    }
}

export default DeleteForm;
