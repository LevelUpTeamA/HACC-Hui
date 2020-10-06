import SimpleSchema from 'simpl-schema';
import { _ } from 'lodash';
import BaseCollection from '../base/BaseCollection';
import { Developers } from '../user/DeveloperCollection';
import { Teams } from './TeamCollection';
import { ROLE } from '../role/Role';

/**
 * Basically a copy of WantToJoinCollection that's just used to store
 * invitations from teams to users.
 */

class TeamInvitationCollection extends BaseCollection {

  constructor() {
    super('TeamInvitation', new SimpleSchema({
      teamID: { type: SimpleSchema.RegEx.Id },
      developerID: { type: SimpleSchema.RegEx.Id },
      sentDM: { type: Boolean },
    }));
  }

  /**
   * Defines a developer - team pair indicating the team wants the developer to join the team.
   * @param team {String} team slug or ID.
   * @param developer {String} developer slug or ID.
   * @return {String} the ID of the pair.
   */
  define({ team, developer, sentDM = false }) {
    const teamID = Teams.getID(team);
    const developerID = Developers.getID(developer);
    return this._collection.insert({ teamID, developerID, sentDM });
  }

  /**
   * Updates the given team-developer pair.
   * @param docID {String} the ID of the pair to update.
   * @param team {String} the slug or ID of the team (optional).
   * @param developer {String} the slug or ID of the developer (optional).
   * @throws {Meteor.Error} if docID is undefined.
   */
  update(docID, { team, developer, sentDM }) {
    // console.log({ team, developer, sentDM });
    this.assertDefined(docID);
    const updateData = {};
    if (developer) {
      updateData.developerID = Developers.getID(developer);
    }
    if (team) {
      updateData.teamID = Teams.getID(team);
    }
    if (_.isBoolean(sentDM)) {
      updateData.sentDM = sentDM;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes the developer-team pair.
   * @param docID {String} the ID to remove.
   */
  removeIt(docID) {
    super.removeIt(docID);
  }

  /**
   * Removes all the pairs with the given developer.
   * @param developer {String} the slug or ID of the developer.
   * @throws {Meteor.Error} if the developer is undefined.
   */
  removeDeveloper(developer) {
    const developerID = Developers.getID(developer);
    this._collection.remove({ developerID });
  }

  /**
   * Removes all the pairs with the given team.
   * @param team {String} the slug or ID for the team.
   * @throws {Meteor.Error} if the team is undefined.
   */
  removeTeam(team) {
    const teamID = Teams.getID(team);
    this._collection.remove({ teamID });
  }

  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.DEVELOPER]);
  }

}

export const TeamInvitation = new TeamInvitationCollection();