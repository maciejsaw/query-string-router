# Query String Router
Easy to use router. Enables you to control everything on your page using reactive queryString params. 

## What is "Router"?
It's a concept of controlling your website state with URL, without reloading your website. You update the URL, and something should happen. You visit the same URL directly, the same thing should happen. 

## Why QueryStringRouter?
The concept of router is often used in popular frameworks like Angular, Backbone, React, Meteor. QueryStringRouter enables you to have similar capabilities without the complexity of above mentioned frameworks. 
- It enforces a simple convention, that all the navigation state should be stored in the URL in a consistent way
- You can store pretty complex things in the URL, like objects, arrays etc. 
- QueryStringRouter handles the URL encoding for you
- Flexibility without complexity

## Benefits for users
- Faster website, because everything works without reloading
- Users can share a link directly to the screen that they see, for example directly to a modal or specific tab
- Back button in the browser goes back to previous state, for example closes an overlay or goes back to previous tab

## Quick Start

### Step 1: add router to your website
- Your website needs to use jQuery
- Add these scripts at the end of your HTML code, before the end of body tag
............
### Step 2: set the URL params, for example when something is clicked
```javascript
$(document).on('click', #tab-contact, function() {
  QueryStringRouter.setParam('activeTab', 'contact');
}
```
### Step 3: define what should happen when URL changes
```javascript
QueryStringRouter.onParamChange('activeTab' , function(value) {
	window.alert("active tab is set to " + value);
});
//Here we say that each time you update the activeTab 
//param in the URL, we will show an alert that says "contact"
```
### Step 4: that's it
When you click the ```#tab-contact``` 
- the URL will update to ```www.yourpage.com/?actveTab=contact```
- the onParamChange action will be triggered

## FAQ:
### Are onParamChange actions retriggered each time I set params?
No, the action will only run when param changed. This prevents the unneccessary flickering of screen and uneeded DOM updates.

## Examples:


