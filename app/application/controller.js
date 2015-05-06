import Ember from 'ember';

export default Ember.Controller.extend({
	// get gui state so we can update markup in this template as well
	needs: ['playback'],
	isMaximized: Ember.computed.oneWay('controllers.playback.isMaximized'),
	isPanelOpen: false,

	actions: {
		togglePanel() {
			this.toggleProperty('isPanelOpen');
		}
	}
});
