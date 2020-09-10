import { Meteor } from 'meteor/meteor';

const deleteAccount = 'Account.delete';

Meteor.methods({
  'Account.delete'() {
    try {
      Meteor.users.remove(this.userId);
    } catch (e) {
      throw new Meteor.Error('user-delete', 'Failed to remove your account');
    }
  },
});

export { deleteAccount };
