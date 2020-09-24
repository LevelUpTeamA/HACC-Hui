import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card } from 'semantic-ui-react';

class InterestedDeveloperExampleWidget extends React.Component {

  render() {
    return (
        <Grid.Row style={{ padding: 20 }}>
          <Grid.Column>
            <Card fluid>
              <Card.Content>
                <Card.Header>{this.props.developer.firstName} {this.props.developer.lastName}</Card.Header>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Card.Meta>
                      <span className='date'>Username: {this.props.developer.username}</span>
                    </Card.Meta>
                    <Card.Meta>
                      <span className='date'>Interested Team: {this.props.developer.interestedTeam}</span>
                    </Card.Meta>
                    <br/>
                    <Card.Description>
                      <span
                          className='date'>About {this.props.developer.firstName}: {this.props.developer.aboutMe}</span>
                    </Card.Description>
                    <Card.Content>
                      <span className='date'>Education Level: {this.props.developer.demographicLevel}</span>
                    </Card.Content>
                  </Grid.Column>
                  <Grid.Column>
                    <Card.Content>
                      <span className='date'>Skills: {this.props.developerSkills}</span>
                    </Card.Content>
                    <Card.Content>
                      <span className='date'>Tools: {this.props.developerTools}</span>
                    </Card.Content>
                    <Card.Content>
                      <span className='date'>Interests: {this.props.developerInterests}</span>
                    </Card.Content>
                    <Card.Content>
                      <span className='date'>Challenges: {this.props.developerChallenges}</span>
                    </Card.Content>
                  </Grid.Column>
                </Grid.Row>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
    );
  }
}

InterestedDeveloperExampleWidget.propTypes = {
  developer: PropTypes.object,
  developerName: PropTypes.string,
  developerSkills: PropTypes.string,
  developerTools: PropTypes.string,
  developerInterests: PropTypes.string,
  developerChallenges: PropTypes.string,
  developerDescription: PropTypes.string,
  developerEducation: PropTypes.string,
  interestedTeam: PropTypes.string,
};

export default InterestedDeveloperExampleWidget;