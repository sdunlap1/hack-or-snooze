"use strict";


/**
 *  Handles navbar clicks and updates
 **/

/** Show main list of all stories when the site name is clicked **/
function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/**
 *  Displays the form to submit when new stories link is clicked
 *  This will only show the form and all stories when page loads
 **/
function navSubmitStoryClick(evt) {
  console.debug("navSubmitStoryClick", evt);
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}
$navSubmitStory.on("click", navSubmitStoryClick);

/**
 *  Displays favorite stories when clicking on favorites link. Will 
 *  be blank if no favs have been selected.
 **/
function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  putFavoritesListOnPage();
}
$body.on("click", "#nav-favorites", navFavoritesClick);

/** Display user's stories when clicking on the my stories link **/
function navMyStories(evt) {
  console.debug("navMyStories", evt);
  hidePageComponents();
  putUserStoriesOnPage();
  $ownStories.show();
}
$body.on("click", "#nav-myStories", navMyStories);

/** Shows login/signup when login/signup is clicked **/

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
  $storiesContainer.hide();
}
$navLogin.on("click", navLoginClick);

/** Only show the user profile when username is clicked **/
function navProfileClicked(evt) {
  console.debug("navProfileClicked", evt);
  hidePageComponents();
  $userProfile.show();
}
$navUserProfile.on("click", navProfileClicked);

/** When a user first logins in, update the navbar to show the user's name. **/
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");

  /** Show main nav links relevant to logged in user **/
  $(".main-nav-links").css("display", "flex");;

  /** Hide login/signup on navbar once user is logged in. **/
  $navLogin.hide();

  /** Show the logout link **/
  $navLogOut.show();

  /** Update the user profile link with the username and show it. **/
  $navUserProfile.text(`${currentUser.username}`).show();
}
