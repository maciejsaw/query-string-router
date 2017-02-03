# Query String Router
Easy to use router. Enables you to control everything on your page using reactive queryString params. 

## What is "Router"?
It's a concept of controlling your website state with URL, without reloading your website. You update the URL, and something should happen. When you visit the same URL directly, the same thing should happen. 

Benefits for users:
- Faster website, because everything works without reloading
- Users can share a link directly to the screen that they see, for example directly to a modal or specific tab
- Back button in the browser goes back to previous state, for example closes an overlay or goes back to previous tab

## Why QueryStringRouter?
The concept of router is often used in popular frameworks like Angular, Backbone, React, Meteor. QueryStringRouter enables you to have similar capabilities without the complexity of above mentioned frameworks. 
- It enforces a simple convention, that all the navigation state should be stored in the URL in a consistent way
- You can store pretty complex things in the URL, like objects, arrays etc. 
- QueryStringRouter handles the URL encoding for you
- Reactivity and flexibility, with little amount of code

## Demo
[See demo with examples](http://querystringrouter-demo.webflow.io/)

## Quick Start

### Step 1: add router to your website
- Your website needs to use jQuery
- Add the below scripts at the end of your HTML code, before the end of body tag (consider hosting the scripts on your server)
- The scripts weight is about 15kb when gzipped
```
<script type="text/javascript" src="https://cdn.rawgit.com/maciejsaw/query-string-router/4d2b8b39/external-deps/mini-meteor.min.js"></script>
<script type="text/javascript" src="https://cdn.rawgit.com/AceMetrix/jquery-deparam/master/jquery-deparam.js"></script>
<script type="text/javascript" src="https://cdn.rawgit.com/maciejsaw/query-string-router/46c945a9/src/query-string-router.js"></script>
```
### Step 2: set the URL params, for example when something is clicked
```javascript
$(document).on('click', '#tab-contact', function() {
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

## Q&A:
#### Are onParamChange actions retriggered each time I set params?
No, the action will only run when param changed. This prevents the unneccessary flickering of screen and redundant DOM updates.
#### Why there are 3 scripts to load?
This package makes use of 'jQuery', 'jQuery deparam' plugin and 'mini-meteor.js'. I assume that you already have jQuery, so we need to load 'deparam' plugin, 'mini-meteor' and the 'query-string-router' itself
#### Can I use boolean values in params?
Yes, but note that they will be treated like strings. To be on the save side in your conditional statements you should use: ```if (value === 'true')```  instead o ```if (value === true)``` 
#### Does it work in old browsers?
No, because it relies on 'pushstate'

## List of methods:
| Method        | Arguments           | Description  |
| ------------- |-------------| -----|
| setParam      | key, value, options | Updates the param in URL. If the param was not set before, it will be appended to URL. Options are optional, you can pass an options object with ```{doNotCreateHistoryState: true}``` which might be useful for some cases |
| setFreshParams      | objectWithNewParams, options |   Resets all existing params and sets new params. Optional ```doNotCreateHistoryState```  |
| setDefaultRootParams | - | Sets some params if user visited the root of URL. Use this to set some initial state, for example load a content of default tab |
| removeParam | key, options | Removes a chosen param. For example you can remove a param to close a modal. Optional ```doNotCreateHistoryState``` which might be useful to prevent back button to reopen the modal again. |
| getParam | key | Returns an object with value of selected param |
| getAllParams | - | Returns an object with all query string params |
| onParamChange | key, actionFunction(value) | Takes function as a second argument, that will be triggered each time the param is changed. The first argument of this function contains the value of the changed param.  |
| retriggerOnParamChange | key | Reruns the action for a specified param. This is useful when you need to rerun the action even when param hasn't been changed. For example when you load something with ajax, you can retrigger the action when loading is finished  |
| retriggerOnParamChangeForAll | - | Reruns the action for all the params. |

## Example usages:
- Switching tabs, so that it is possible to go back with back button or link directly to this tab
- Showing/hiding modals and overlays that support back button 
- Showing/hiding modals and overlays with different content that is loaded with ajax
- Expanding/collapsing sections, for example search results
- Switching a flag when a certain link was opened
- Loading content into central panel, for example loading folder content
- Hiding an overlay when escape key is used
- Loading different fullscreen modules into the DOM
- [See examples with code snippets](https://github.com/maciejsaw/query-string-router/blob/master/example-snippets.md)


## Credits:
- QueryStringRouter is based on Meteor.js Tracker front-end library and [repackaged by Deanius](https://github.com/deanius/mini-meteor) 
- It was coded in Egnyte Poland UX team, as a utility for front-end prototypes


