var QueryStringRouter = (function() {

	/*----------  Reacting to route changes  ----------*/

	var reactiveRouterParams = new ReactiveMap();

	//decode query string
	function getQueryStringParams() {
		return deparam(window.location.search.substring(1));
	}

	function getQueryStringParam(key) {
		return deparam(window.location.search.substring(1))[key];
	} 

	//each time this function is fired, all Meteor.run functions will run, but only
	//the ones for which the value changed

	//we diff against the previous params, so that we can remove the params that are not present
	//in the query string from the reactive params
	var previousQueryStringParams = {};
	function processQueryStringParams() {
		var queryStringParams = getQueryStringParams();
		//console.log(previousQueryStringParams);

		//check what previous params are not present in the new query string
		$.each(previousQueryStringParams, function(key, value) {
			if (typeof queryStringParams[key] == 'undefined') {
				reactiveRouterParams.set(key, undefined);
			}
		});

		$.each(queryStringParams, function(key, value) {
			reactiveRouterParams.set(key, value);
		});

		previousQueryStringParams = queryStringParams

		//console.log(queryStringParams);
		//console.log(reactiveRouterParams);

		return queryStringParams;	
	}

	//when document loads, set reactive params 
	processQueryStringParams();

	//when url changes, also set reactive params
	$(window).on('popstate', function() {
		processQueryStringParams();
		//console.log('popstate');
	});

	//when ajax reloads something, also trigger the reactive functions.
	//They should not do anything if nothing was changed
	$(document).on('ajaxComplete', function() {
		//retrigger actions for all params, so that the ajax loaded views are updated
		//TODO: how to do this?
	});

	function queryStringRouterSetParam(key, value, options) {
		var queryStringParams = deparam(window.location.search.substring(1));
		queryStringParams[key] = value;
		var newQueryString = $.param(queryStringParams);

		options = options || {};
		if (options.doNotCreateHistoryState === true) {
			window.history.replaceState('','', '?'+newQueryString);
		} else {
			window.history.pushState('','', '?'+newQueryString);
		}

		$(window).trigger('popstate');    
	}

	function removeParam(key, options) {
		var queryStringParams = deparam(window.location.search.substring(1));
		delete queryStringParams[key];
		var newQueryString = $.param(queryStringParams);

		options = options || {};
		console.log(options);
		if (options.doNotCreateHistoryState === true) {
			window.history.replaceState('','', '?'+newQueryString);
			console.log('replace state');
		} else {
			window.history.pushState('','', '?'+newQueryString);
		}

		$(window).trigger('popstate'); 
	}

	function setFreshParams(newParamsObj) {
		var newQueryString = $.param(newParamsObj);
		window.history.pushState('','', '?'+newQueryString);
		$(window).trigger('popstate'); 
	}

	function queryStringRouterGetReactiveParam(key) {
		return reactiveRouterParams.get(key);
	}

	var actionsOnParamChange = {};
	function onParamChange(key, actionFunction) {
		//for each key in the reactive router params, define a reactive autorun 
		//Each of the params will react to change independently, only if changed
		Meteor.run(function() {
			var param = reactiveRouterParams.get(key); //note that this is reactive getParam, not the static getQueryStringParam used elsewhere
			actionFunction(param);
		});

		//store the action on param in a separate object, so that we can retrigger this route manually
		//because this might be needed for ajax loaded content etc.
		actionsOnParamChange[key] = actionFunction;
	}

	function retriggerOnParamChange(key) {
		var param = getQueryStringParam(key);
		actionsOnParamChange[key](param);
	}

	function retriggerOnParamChangeForAll() {
		$.each(actionsOnParamChange, function(key, value) {
			var param = getQueryStringParam(key);
			actionsOnParamChange[key](param);
		});
	}

	return {
		setParam: queryStringRouterSetParam,
		getAllParams: processQueryStringParams,
		setFreshParams: setFreshParams,
		getParam: queryStringRouterGetReactiveParam,
		onParamChange: onParamChange,
		retriggerOnParamChange: retriggerOnParamChange,
		retriggerOnParamChangeForAll: retriggerOnParamChangeForAll,
		removeParam: removeParam,
	}

})();

//Note that you don't need to store routes in one file. It's better to keep them together with features,
//so that you can use their functions after they are defined

// QueryStringRouter.onParamChange('openModal' , function(value) {
// 	if (value === 'true') {
// 		console.log('modal will be open!');
// 	} else {
// 		console.log('hide  modal!');
// 	}
// });

// QueryStringRouter.onParamChange('activeTab' , function(value) {
// 	if (value === 'comments') {
// 		console.log('switch tab to comments');
// 	} else if (value === 'products') {
// 		console.log('switch tab to products');
// 	} else if (value === 'pictures') {
// 		console.log('switch tab to pictures');
// 	}
// });

// QueryStringRouter.onParamChange('centralPanelFolderPath' , function(value) {
// 	if (typeof value != 'undefined') { //how to make sure that you don't need to write this
// 		console.log('in the central panel, a folder with path '+value+' will be loaded');
// 	}
// });

// QueryStringRouter.retriggerOnParamChange('activeTab');

