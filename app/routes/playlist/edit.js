import Ember from 'ember';

export default Ember.Route.extend({

	// Abort if user isn't allowed to edit
	beforeModel: function() {
		var canEdit = this.controllerFor('playlist').get('canEdit');
		if (!canEdit) { this.transitionTo('playlist', this.modelFor('playlist')); }
	},

	// render into the playlist template
	renderTemplate: function() {
		this.render({ outlet: 'playlist-header'});
	},

	// indicate we're editing (used for changing buttons etc.)
	setupController: function(controller, model) {
		this._super(controller, model);
		this.controllerFor('playlist').set('isEditing', true);
	},

	// clear any unsaved changes
	deactivate: function() {
		this.controllerFor('playlist').get('model').rollback();
		this.controllerFor('playlist').set('isEditing', false);
	},

	actions: {
		//  this action is triggered from the add.js controller/template
		saveTrack: function(track) {
			track.save();
		},
		tryDelete: function() {
			var confirmed = confirm('Are you sure? Your channel will be gone forever.');
			if (confirmed) {
				this.controllerFor('playlist').send('deletePlaylist');
			}
		}
	}
});
