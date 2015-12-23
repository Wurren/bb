
import $ from 'jquery';
import Backbone from 'backbone';
import AppView from './views/app';



/*
|--------------------------------------------------------------------------
| Script
|--------------------------------------------------------------------------
*/

$(() => {
    new AppView();
    // Backbone.history.start({ pushState: true, root: '/' });
});
