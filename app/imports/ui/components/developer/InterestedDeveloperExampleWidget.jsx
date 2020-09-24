import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon, Card } from 'semantic-ui-react';

class InterestedDeveloperExampleWidget extends React.Component {

  render() {
    return (
        <Grid.Row>
          <Grid.Column>
            <Card fluid>
              <Card.Content>
                <Card.Header>{this.props.developer.firstName} {this.props.developer.lastName}</Card.Header>
                <Card.Meta>
                  <span className='date'>Username: {this.props.developer.username}</span>
                </Card.Meta>
                <Card.Meta>
                  <span className='date'>About {this.props.developer.firstName}: {this.props.developer.aboutMe}</span>
                </Card.Meta>
                <Card.Meta>
                  <span className='date'>Education Level: {this.props.developer.demographicLevel}</span>
                </Card.Meta>
                <Card.Meta>
                  <span className='date'>Skills: {this.props.developerSkills}</span>
                </Card.Meta>
                <Card.Meta>
                  <span className='date'>Tools: {this.props.developerTools}</span>
                </Card.Meta>
                <Card.Meta>
                  <span className='date'>Interests: {this.props.developerInterests}</span>
                </Card.Meta>
                <Card.Meta>
                  <span className='date'>Challenges: {this.props.developerChallenges}</span>
                </Card.Meta>
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
};

export default InterestedDeveloperExampleWidget;