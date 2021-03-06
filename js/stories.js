"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

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
 * If user is logged in, will reveal markup for favorite toggler.
 */

function generateStoryMarkup(story) {

  const hostName = story.getHostName();
  const isFavorited = currentUser && currentUser.favorites.some(fav => fav.storyId === story.storyId);

  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <span class="favorite ${isFavorited? "favorited": ""}" 
        ${currentUser? "": "hidden"}>
          ${isFavorited? "Un-favorite": "Favorite"}
        </span>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Gets list of favorite stories from current user, generates their HTML, and puts on page. */

function putFavoriteStoriesOnPage() {

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Gets list of stories from current user, generates their HTML, and puts on page.
 *  will also append a delete button to each story.
 */

function putOwnStoriesOnPage() {

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story);
    const $deleteBtn = $("<button>").addClass("delete-btn").text("DELETE");
    $story.append($deleteBtn);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** handler function for story form submission 
 *  Will reset form inputs upon submission
*/
function submitStory(evt) {

  evt.preventDefault();
  
  let title = $("#story-title")[0].value;
  let url = $("#story-url")[0].value;
  let author = $("#author")[0].value;
  
  storyList.addStory(currentUser, {title, author, url});

  $("#story-form input").val("");
}

$storyForm.on("submit", submitStory);

/** handler function for favoriting story upon click
 *  this event listener is assigned to the story list element
 */
async function handleFavoriteClick(evt) {
  if (!$(evt.target).hasClass("favorite")) return;

  const $span = $(evt.target);
  const id = $span.parent()[0].id;

  if ($span[0].classList.contains("favorited")) {
    currentUser = await currentUser.removeFavoriteStory(id);
    $span.text("Favorite");
  }
  else {
    currentUser = await currentUser.addFavoriteStory(id);
    $span.text("Unfavorite");
  }
  $span[0].classList.toggle("favorited");
}

/** handler function for deleting story upon click
 *  checks if story is also present in favorites, and deletes it
 *  this event listener is assigned to the story list element
 */
async function handleDeleteClick(evt) {
  if (evt.target.tagName !== "BUTTON") return;

  const $btn = $(evt.target);
  const id = $btn.parent()[0].id;

  if (currentUser.favorites.some(story => story.storyId === id)) {
    currentUser = await currentUser.removeFavoriteStory(id);
  }

  storyList.removeStory(id);
  await currentUser.removeOwnStory(id);

  
  $btn.parent().remove();
}