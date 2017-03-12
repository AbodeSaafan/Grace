function compiledClicked(){
	var userCode = $("#codeInput").val();
	var params = { 
		method: "GET", 
		url: "/compile", 
		data: { "code":userCode } 
	};
	var request = $.ajax(params);
	request.done(function(data) {
		var output = (typeof data['error'] !== 'undefined')? data['error'] : data['output'];
		$("#codeOutput").val(output);
	});
}