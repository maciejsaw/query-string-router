#### Showing/hiding modals and overlays with different content that is loaded with ajax
```javascript
QueryStringRouter.onParamChange('modalContent', function(value) {
    if (typeof value != 'undefined') {
        $(".black-overlay-modal").fadeIn(200, function() {
            $(".modal-box").fadeIn(200);
        });
        $(".modal-wrapper").fadeOut(0).load(value+" "+".modal-content", function() {
            $(this).fadeIn(600);
        });  
    } else {
        $(".black-overlay-modal").fadeOut(300);
        $(".modal-box").fadeOut(300, function() {
            $(".modal-content").remove();
        }); 
    }
});

$(document).on('click', '#open-details-modal', function() {
    QueryStringRouter.setParam('modalContent', '/modals/details'});
});

$(document).on('click', '#close-modal-button', function(event) {
    QueryStringRouter.removeParam('modalContent', {doNotCreateHistoryState: true});
});
```

#### Switching a flag when a certain link was opened
```javascript
QueryStringRouter.onParamChange('trial', function(value) {
    console.log(value);
    if (value == 'true') {
        //set flag to true
    } else if (value == 'false') {
        //set flag to false
    }
});
```
#### Switching tabs, so that it is possible to go back with back button or link directly to this tab
```javascript
//Note that you don't need to store routes in one place or one file. It's better to keep them together with features,
//so that you can use their functions after they are defined

//near a code related to "Downloads" tab
QueryStringRouter.onParamChange('tab', function(value) {
    if (value === 'downloads') {
        $('.current-nav-item').removeClass('current-nav-item');
        $('#navbar-downloads').addClass('current-nav-item');
    } else {
        $('#navbar-downloads').removeClass('current-nav-item');
    }
});

//near a code related to "Contact" tab
QueryStringRouter.onParamChange('tab', function(value) {
    if (value === 'contact') {
        $('.current-nav-item').removeClass('current-nav-item');
        $('#navbar-contact').addClass('current-nav-item');
    } else {
        $('#navbar-contact').removeClass('current-nav-item');
    }
});
```

#### Expanding/collapsing sections, for example search results
```javascript
QueryStringRouter.onParamChange('showSearch' , function(value) {
    if (value === 'true') {
        showSearchResults();
    } else if (typeof value == 'undefined') { 
        hideSearch(); 
        console.log('search should not be shown');
    }
});
$(document).on('click', '[data-action-hide-search]', function(event) { //we use CSS attributes to bind action
    QueryStringRouter.removeParam('showSearch', {doNotCreateHistoryState: true});
});
```
#### Loading content into central panel, for example loading folder content
```javascript
QueryStringRouter.onParamChange('folderPath' , function(value) {
    if (typeof value != 'undefined') {
        console.log('in the central panel, a folder with path '+value+' will be loaded');
        $('.central-panel-wrapper').fadeOut(140, function() {
            $(this).load(value+" ".folder-content, function() {
                setAsCurrent();
                $(this).fadeIn(110);  
            });            
        });
    }
});

$(document).on('click', '[ajax-href]', function(e) {
    ajax_href = $(this).attr('ajax-href');
    QueryStringRouter.setParam('folderPath', ajax_href);
    //also make sure that search will be hidden when loading a folder
    QueryStringRouter.removeParam('showSearch', {doNotCreateHistoryState: true});
});
```
#### Hiding an overlay when escape key is used
```javascript
$(document).one('keydown.preview', function(event) {
    if (event.which === 27) {
        QueryStringRouter.removeParam('previewOpen', {doNotCreateHistoryState: true});
    }
});
```
