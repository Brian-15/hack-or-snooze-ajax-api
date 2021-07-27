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

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navLeft.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** handler function for submit story navigation link
 *  displays form and fills DOM with stories from the API
 */

function navSubmitStoryClick() {
  $storyForm.show();
  putStoriesOnPage();
}

$navSubmitStory.on("click", navSubmitStoryClick);

/** handler function for favorites navigation link
 *  empties list of stories and places user's current favorite stories.
 */

function navFavoritesClick() {
  hidePageComponents();
  putFavoriteStoriesOnPage();
}

$navFavorites.click(navFavoritesClick);

/** handler function for displaying currentUser's own stories
 *  
 *  - empties list of stories and fills with user's stories
 *  - adds delete button to each story
 */
function navMyStories() {
  hidePageComponents();
  putOwnStoriesOnPage();
}

$navMyStories.click(navMyStories);