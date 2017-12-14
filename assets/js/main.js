//Main JS
var formSending = false;
var files = '';
var data;

F = '';
$(function () {

	$('.form .field-item').focusin(function () {
		$(this).addClass("field-item--focused");
	});

	$('.form .field-item').focusout(function () {
		if ($(this).find('input').val() == '') {
			$(this).removeClass("field-item--focused");
		};
	});



	var computedObj = {
		id: function () {
			return this.$parent.fieldsArr[this._uid - 1]['id'];
		},
		type: function () {
			return this.$parent.fieldsArr[this._uid - 1]['type'];
		},
		required: function () {
			return this.$parent.fieldsArr[this._uid - 1]['required'];
		},
		placeholderText: function () {
			return this.$parent.fieldsArr[this._uid - 1]['placeholderText'];
		},
		errorMessage: function () {
			return this.$parent.fieldsArr[this._uid - 1]['errorMessage'];
		},
		correctMessage: function () {
			return this.$parent.fieldsArr[this._uid - 1]['correctMessage'];
		},
		name: function () {
			return this.$parent.fieldsArr[this._uid - 1]['name'];
		}
	}


	var components = {
		fieldInput: Vue.component('field-input', {
			template: templates['templates/input.html'],
			computed: (function () {
				var val = {
					value: {
						get: function () {
							return this.$parent.fieldsArr[this._uid - 1]['value'];
						},
						set: function (newValue) {
							console.log("Input", newValue);
						}
					}
				}
				var res = $.extend(computedObj, val);
				return res;
			})()
		}),
		fieldTextarea: Vue.component('fieldTextarea', {
			template: templates['templates/textarea.html'],
			computed: (function () {
				var val = {
					value: {
						get: function () {
							return this.$parent.fieldsArr[this._uid - 1]['value'];
						},
						set: function (newValue) {
							console.log("TextArea", newValue);
						}
					}
				}
				var res = $.extend(computedObj, val);
				return res;
			})()
		})
	}


	var myFields = [{
		componentName: 'fieldInput',
		type: 'input',
		required: 'name',
		placeholderText: 'placeholderText',
		errorMessage: 'errorMessage',
		correctMessage: 'correctMessage',
		name: 'name',
		id: '1'
	}, {
		componentName: 'fieldTextarea',
		type: 'textarea',
		required: 'name',
		placeholderText: 'placeholderText2',
		errorMessage: 'errorMessage',
		correctMessage: 'correctMessage',
		name: 'name',
		id: '2'
	}, {
		componentName: 'fieldInput',
		type: 'input',
		required: 'name',
		placeholderText: 'placeholderText3',
		errorMessage: 'errorMessage3',
		correctMessage: 'correctMessage3',
		name: 'name',
		id: '3'
	}, {
		componentName: 'fieldInput',
		type: 'input',
		required: 'name',
		placeholderText: 'placeholderText3',
		errorMessage: 'errorMessage3',
		correctMessage: 'correctMessage3',
		name: 'name',
		id: '3'
	}];

	var myFields2 = [{
		componentName: 'fieldInput',
		type: 'input',
		required: 'name',
		placeholderText: 'placeholderText',
		errorMessage: 'errorMessage',
		correctMessage: 'correctMessage',
		name: 'name',
		id: '1'
	}];


	F = new Forms('#my_form', myFields);
	//F2 = new Forms('#my_form2', myFields2);

	function Forms(container, fieldsArr) {

		var comps = {};

		fieldsArr.forEach(function (value, key) {
			comps[value.componentName] = components[value.componentName];
		});

		document.getElementById(container.replace("#", '')).innerHTML = templates['templates/init.html'];
		return new Vue({
			el: container,
			data: {
				fieldsList: [],
				fieldsArr: fieldsArr
			},
			components: comps,

			computed: {
				renderAllComponents: function () {
					var that = this;
					fieldsArr.forEach(function (value, key) {
						that.fieldsList.push({
							name: value.componentName
						});
					});
					return "";
				},

			},
			mounted: function () {}
		});
	}









}); //end onload