var CU = require('../compilerUtils'),
	_ = require('../../../lib/alloy/underscore')._;

exports.parse = function(node, state) {
	return require('./base').parse(node, state, parse);
};

function parse(node, state, args) {
	var code = '';
	var styleObjectCode = CU.generateStyleParams(
		state.styles, 
		args.classes, 
		args.id, 
		node.nodeName, 
		_.defaults(state.extraStyle || {}, args.createArgs || {}) 
	);
	var styleObjectSymbol = CU.generateUniqueId(); 
	var initStyle = '_.pick(' + styleObjectSymbol + ',Alloy.Android.menuItemCreateArgs)';
	var postStyle = '_.omit(' + styleObjectSymbol + ',Alloy.Android.menuItemCreateArgs)';

	code += 'var ' + styleObjectSymbol + '=' + styleObjectCode + ';';
	code += args.symbol + '=A$(' + state.parent.symbol + ".add(" + initStyle + "), '" + node.nodeName + "', " + (args.parent.symbol || 'null') + ");";
	
	// TODO: http://jira.appcelerator.org/browse/ALOY-313
	code += '_.each(' + postStyle + ',function(v,k) { ' + args.symbol + '[k] = v; });';

	return {
		parent: {},
		styles: state.styles,
		code: code
	};
};