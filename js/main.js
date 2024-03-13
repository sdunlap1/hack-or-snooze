"use strict";

// Global DOM element selectors for caching and easy access throughout the app.

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $favoritedStories = $("#favorited-stories");
const $ownStories = $("#myStories");
const $storiesContainer = $("#stories-container");

// This will find all instances of the class stories-list. Currently 3.
const $storiesLists = $(".stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $submitForm = $("#submit-form");

const $navSubmitStory = $("#nav-submit-story");
const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $userProfile = $("#user-profile");

/** 
 *  Use hidePageComponents to show a specific view when needed. 
 *  For example, when clicking on Favorites and My Stories links.
 **/

function hidePageComponents() {
  const components = [
    $storiesLists,
    $submitForm,
    $loginForm,
    $signupForm,
    $userProfile,
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials are in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if there is a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn(
  "HEY STUDENT: This program sends many debug messages to" +
    " the console. If you don't see the message 'start' below this, you're not" +
    " seeing those helpful debug messages. In your browser console, click on" +
    " menu 'Default Levels' and add Verbose"
);
$(start); 
