// import React from 'react';
// import { Table, Header, Loader, Grid, Button, Divider, Segment } from 'semantic-ui-react';
// import { withTracker } from 'meteor/react-meteor-data';
// import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { Teams } from '../../../api/team/TeamCollection';
// import { TeamSkills } from '../../../api/team/TeamSkillCollection';
// import { TeamChallenges } from '../../../api/team/TeamChallengeCollection';
// import { TeamTools } from '../../../api/team/TeamToolCollection';
// import { TeamDeveloper } from '../../../api/team/TeamDeveloperCollection';
// import { Tools } from '../../../api/tool/ToolCollection';
// import { Skills } from '../../../api/skill/SkillCollection';
// import { Challenges } from '../../../api/challenge/ChallengeCollection';
// // import ChallengesAdmin from '../../components/administrator/ChallengesAdmin';
// // import SkillsAdmin from '../../components/administrator/SkillsAdmin';
// // import ToolsAdmin from '../../components/administrator/ToolsAdmin';
// import { ROUTES } from '../../../startup/client/route-constants';
//
// /**
//  * Renders the Page for adding stuff. **deprecated**
//  * @memberOf ui/pages
//  */
// class TeamFinder extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tools: [],
//       skills: [],
//       challenges: [],
//     };
//   }
//
//   /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
//   render() {
//     return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
//   }
//
//   renderPage() {
//     const values = [
//       {key: 'challenges', text: 'challenges', value: 'challenges',},
//       {key: 'tools', text: 'tools', value: 'tools',},
//       {key: 'skills', text: 'skills', value: 'skills',},
//     ];
//   }
//
//   const teamSkills = () {
//
// }
//
//   const teamTools = () {
//
// }
//
//   const teamChallenges = () {
//
// }
//
//   function getSkills(teamID, teamSkills) {
//     const data = [];
//   }
//
//   functions getTools(teamID, teamTools) {
//   }
//
//   function getChallenges(teamID, teamChallenges) {
//
//   }
//
// }
//
// TeamFinder.propTypes = {
//   challenges: PropTypes.array.isRequired,
//   skills: PropTypes.array.isRequired,
//   tools: PropTypes.array.isRequired,
//   developers: PropTypes.array.isRequired,
//   ready: PropTypes.bool.isRequired,
//
// };
//
// export default withTracker(() => {
//   const subscriptionChallenges = Challenges.subscribe();
//   const subscriptionSkills = Skills.subscribe();
//   const subscriptionTools = Tools.subscribe();
//   const subscriptionDevelopers = Developers.subscribe();
//
//   return {
//     challenges: Challenges.find({}).fetch(),
//     skills: Skills.find({}).fetch(),
//     tools: Tools.find({}).fetch(),
//     developers: Developers.find({}).fetch(),
//     // eslint-disable-next-line max-len
//     ready: subscriptionChallenges.ready() && subscriptionSkills.ready() && subscriptionTools.ready() && subscriptionDevelopers,
//   };
// })(TeamFinder);
//
