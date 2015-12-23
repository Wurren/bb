import $ from 'jquery';
import Backbone from 'backbone';
import AppTemp from '../templates/app.hbs'

var AppView = Backbone.View.extend({

    el: "#app",

    initialize: function() {
        console.log('GO CLOUD GO!');
        this.render();
    },

    render: function() {
        this.$el.html(AppTemp());
        return this;
    }

})

export default AppView;
