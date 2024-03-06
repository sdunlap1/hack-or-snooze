"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/* Show the form to submit stories */
function navSubmitStoryClick(evt) {
  console.debug("navSubmitStoryClick", evt);
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}
$navSubmitStory.on("click", navSubmitStoryClick);

/* Show favorite stories when clicking on favorites link */
function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  putFavoritesListOnPage();
}
$body.on("click", "#nav-favorites", navFavoritesClick);

/* Show my stories when clicking on my stories link */
function navMyStories(evt) {
  console.debug("navMyStories", evt);
  hidePageComponents();
  putUserStoriesOnPage();
  $ownStories.show();
}
$body.on("click", "#nav-myStories", navMyStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
  $storiesContainer.hide();
}
$navLogin.on("click", navLoginClick);

/* Only show profile, hide everything eles when profile is clicked */
function navProfileClicked(evt) {
  console.debug("navProfileClicked", evt);
  hidePageComponents();
  $userProfile.show();
}
$navUserProfile.on("click", navProfileClicked);

/** When a user first logins in, update the navbar to reflect that. */
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");

  // Show main nav links relevant to logged in user
  $(".main-nav-links").css("display", "flex");;

  // Hide login/signup once user is logged in.
  $navLogin.hide();

  // Show the logout link
  $navLogOut.show();

  // Update the user profile link with the username and show it.
  $navUserProfile.text(`${currentUser.username}`).show();
}
