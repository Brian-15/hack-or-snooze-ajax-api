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

/** handle form submission */

function navSubmitStoryClick() {
  $('#story-form').show();
  putStoriesOnPage();
}

$navSubmitStory.on("click", navSubmitStoryClick);

/** nav favorites
 * 
 */

function handleNavFavorites() {
  hidePageComponents();
  putFavoriteStoriesOnPage();
}

$navFavorites.click(handleNavFavorites);

/** nav own stories */
function handleNavStories() {
  hidePageComponents();
  putOwnStoriesOnPage();
  $allStoriesList.unbind().click(handleDeleteClick);
}

$navMyStories.click(handleNavStories);