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
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <span class="favorite">${putFavoriteMarkupOnStory(story)}</span>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    putFavoriteMarkupOnStory($story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** submits story from form */
function submitStory(evt) {

  evt.preventDefault();
  
  const title = $('#story-title')[0].value;
  const url = $('#story-url')[0].value;
  const author = $('#author')[0].value;
  
  storyList.addStory(currentUser, {title, author, url});
}

$("#story-form button").click(submitStory);

/** generate favorite markup */
function putFavoriteMarkupOnStory(story) {

  if (currentUser.favorites.some(s => s.storyId === story.storyId)) {
    return "unfavorite";
  }
  else { 
    return "favorite";
  }

}