"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. **/

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  //If a user is logged in show fav/non-fav star
  const showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
      <div>
      ${showDeleteBtn ? getDeleteBtnHTML() : ""}
      ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        </div>
      </li>
    `);
}

/** Make delete button (trash can) using HTML for story **/
function getDeleteBtnHTML() {
  return `<span class="trash-can"><i class="fas fa-trash-alt"></i></span>`;
}

/** Make fav/non-fav star for stories **/
function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `<span class="star"><i class="${starType} fa-star"></i></span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. **/

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Logic to delete a story **/
async function deleteStory(evt) {
  console.debug("deleteStory");

  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");

  await storyList.removeStory(currentUser, storyId);

  // re-generate story list
  await putUserStoriesOnPage();
}
$ownStories.on("click", ".trash-can", deleteStory);

/** Submit new story form **/
async function submitNewStory(evt) {
  console.debug("submitNewStory");
  evt.preventDefault();

  // Grab all info from form
  const title = $("#title").val();
  const url = $("#url").val();
  const author = $("#author").val();
  const username = currentUser.username;
  const storyData = { title, url, author, username };

  const story = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  // Hide the form and reset it
  $submitForm.slideUp("slow");
  $submitForm.trigger("reset");
}
$submitForm.on("submit", submitNewStory);

/*
=============================================
Function for list of user's own stories
=============================================
*/
function putUserStoriesOnPage() {
  console.debug("putUserStoriesOnPage");

  $ownStories.empty();

  if (currentUser.ownStories.length === 0) {
    $ownStories.append("<h5>No stories added by user yet!</h5>");
  } else {
    // Loop through all user stories and generate HTML
    for (let story of currentUser.ownStories) {
      let $story = generateStoryMarkup(story, true);
      $ownStories.append($story);
    }
  }
  $ownStories.show();
}

/*
===============================================
=== Put favs on page and star/un-star story ===
===============================================
*/

function putFavoritesListOnPage() {
  console.debug("putFavoritesListOnPage");

  $favoritedStories.empty();

  if (currentUser.favorites.length === 0) {
    $favoritedStories.append("<h5>No favorites added</h5>");
  } else {
    // Loop thru all user favs and generate HTML
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoritedStories.append($story);
    }
  }
  $favoritedStories.show();
}

/*
===================================
== Handles fav/un-fav of a story ==
===================================
*/

async function toggleStoryFavorite(evt) {
  console.debug("toggleStoryFavorite");

  const $target = $(evt.target);
  const $closestLi = $target.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);

  // See if story is already a fav
  if ($target.hasClass("fas")) {
    // If currently a fav remove from user's fav list and unstar
    await currentUser.removeFavorite(story);
    $target.closest("i").toggleClass("fas far");
  } else {
    // currently not a favorite: do the opposite
    await currentUser.addFavorite(story);
    $target.closest("i").toggleClass("fas far");
  }
}
$storiesLists.on("click", ".star", toggleStoryFavorite);
