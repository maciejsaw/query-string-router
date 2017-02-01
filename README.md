# Query String Router
Easy to use router. Enables you to control everything on your page using reactive queryString params. 

## What is router?
It's a concept of controlling your website state with URL, without reloading your website. You update the URL, and something should happen. You visit the same URL directly, the same thing should happen. 

## Why QueryStringRouter?
The concept of a router (controlling your website with URL is often used in popular frameworks like Angular, Backbone, React, Meteor. 
- QueryStringRouter enables you to have similar capabilities without the complexity of above mentioned frameworks. 
- It enforces a simple convention, that all the navigation state should be stored in the URL in a consistent way
- You can store pretty complex things in the URL, like objects, arrays etc. 
- QueryStringRouter handles the URL encoding for you
- Flexibility without complexity

## Benefits for users
- Faster website, because everything works without reloading
- Users can share a link directly to the screen that they see, for example directly to a modal or specific tab
- Back button in the browser goes back to previous state, for example closes an overlay or goes back to previous tab
