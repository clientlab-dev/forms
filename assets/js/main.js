//Main JS
var formSending = false;
var files = '';
var data;


var fieldsCounter = 0;
var formsCounter = 0;


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
			return this.$parent.fieldObj['id'];
		},
		type: function () {
			return this.$parent.fieldObj['type'];
		},
		required: function () {
			return this.$parent.fieldObj['required'];
		},
		placeholderText: function () {
			return this.$parent.fieldObj['placeholderText'];
		},
		errorMessage: function () {
			return this.$parent.fieldObj['errorMessage'];
		},
		correctMessage: function () {
			return this.$parent.fieldObj['correctMessage'];
		},
		name: function () {
			return this.$parent.fieldObj['name'];
		}
	}

	computedObj = {}


	var components = {
		/*fieldInput: Vue.component('fieldInput', {
			template: templates['templates/input.html'],
			computed: (function () {
				var val = {
					value: {
						get: function () {
							//console.log('this.$parent.fieldsArr', this.$parent.fieldsArr);
							return this.$parent.fieldsArr[this._uid - 1]['value'];
						},
						set: function (newValue) {
							//console.log("Input", newValue);
							//console.log('this', this);
						}
					}
				}

				var res = $.extend(computedObj, val);
				return res;
			})()
		}),*/

		fieldInput: Vue.component('fieldTextarea', {
				template: templates['templates/fieldTextarea.html'],
				computed: (function () {
					var val = {
						value: {
							get: function () {
								//console.log('this.$parent.fieldsArr', this.$parent.fieldsArr);
								//return this.$parent.fieldsArr[this._uid - 1]['value'];
							},
							set: function (newValue) {
								//console.log("Input", newValue);
								//console.log('this', this);
							}
						}
					}

					var res = $.extend(computedObj, val);
					return res;
				})()
			})
			//fieldTextarea: new Component('fieldInput'),
			//fieldTextarea: new Component('fieldTextarea')
	}

	function Component(name, fieldObj) {
		//debugger;
		/*Object.defineProperty(this, name, {
			get: function () {
				return Vue.component(name, {
					template: templates['templates/' + name + '.html'],
					computed: (function () {
						var val = {
							value: {
								get: function () {
									//console.log(name, this);
									return this.$parent.fieldObj['value'];
								},
								set: function (newValue) {
									//console.log("TextArea", newValue);
								}
							}
						}

						var res = $.extend(computedObj, val);
						//console.log('res', res);
						return res;
					})()
				})
			}
		});*/

		this[name] = Vue.component(name, {
			template: templates['templates/' + name + '.html'],
			computed: (function () {
				var val = {
					value: {
						get: function () {
							//console.log(name, this);
							return this.$parent.fieldObj['value'];
						},
						set: function (newValue) {
							//console.log("TextArea", newValue);
						}
					}
				}

				var res = $.extend(computedObj, val);
				//console.log('res', res);
				return res;
			})()
		});

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
		componentName: 'fieldTextarea',
		type: 'textarea',
		required: 'name',
		placeholderText: 'placeholderText2',
		errorMessage: 'errorMessage',
		correctMessage: 'correctMessage',
		name: 'name',
		id: '2'
	}];


	//debugger;
	//F = new Forms('#my_form', myFields);
	//F2 = new Forms('#my_form2', myFields);
	F2 = new Forms('#my_form2', myFields2);



	function Forms(container, fieldsArr) {
		formsCounter++;
		var comps = {};
		var coponentsOpts = {};

		fieldsArr.forEach(function (value, key) {

			//fieldsCounter++;

			//console.log('value', value);

			//var componentCopy = components[value.componentName][value.componentName];
			//console.log('value.componentName', value.componentName);
			//debugger;
			var component = new Component(value.componentName, value);
			console.log('component', component);
			//components[value.componentName] = new Component(value.componentName, value);

			//console.log('component', component);
			//debugger;

			comps[value.componentName] = component[value.componentName];


		});
		//console.log('comps', comps);

		document.getElementById(container.replace("#", '')).innerHTML = templates['templates/init.html'];
		return new Vue({
			el: container,
			data: {
				fieldsList: [],
				fieldsArr: fieldsArr,
				coponentsOpts: ''
			},
			components: comps,

			computed: {
				renderAllComponents: function () {
					var that = this;
					console.log('comps', comps);



					console.log('that', that);
					fieldsArr.forEach(function (value, key) {
						//		console.log('fieldsArr', fieldsArr);
						//		console.log(value.componentName);
						//debugger;
						//console.log('value', value);
						console.log('value.componentName', value.componentName);

						/*that.fieldsList.push({
							name: value.componentName
						});*/
					});
					return "";
				},

			},
			mounted: function () {}
		});
	}

	console.log(formsCounter, fieldsCounter);









}); //end onload