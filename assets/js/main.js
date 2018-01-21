//Main JS
$(function(){

//templates requre

function FieldConstructor(fieldObj){
		var defaults = {
			componentName: 'fieldInput',
			type: 'text',
			required: 'false',
		 	placeholderText: 'Placeholder text',
			errorMessage: 'Error message',
			correctMessage: 'Correct message',
			name: 'input-name',
			id: 'input-id',
			value:'',
			validateOnBlur:false,

			validationRule: function(val){
				console.log("validation...",val);
				if (opt.required) {
					if (val =='') {
						return true;
					}else{
						return false;
					}
				}
			},

			onType: function(){},
			onFocus: function(){},
			onBlur: function(){},
		}
		var opt = $.extend({}, defaults, fieldObj);
		var that = this;
		console.log(opt);

		that.template = templates['templates/'+opt.componentName+'.html']
										.replace('{{type}}',opt.type)
										.replace('{{id}}',opt.id)
										.replace('{{value}}',opt.value)
										.replace('{{errorMessage}}',opt.errorMessage)
										.replace('{{correctMessage}}',opt.correctMessage)
										.replace('{{placeholderText}}',opt.placeholderText);


		var el = $.parseHTML(that.template);
		that.el = el;
		var inp = $(that.el).find('input, textarea');
		that.inp = inp;
		that.validation = opt.validation;


		that.makeValidate = function(){
			if (opt.required === true) {
				var res = opt.validationRule(inp.val());

				if (res) {
					that.makeInvalid();
				}else{
					that.makeValid();
				}
			}
		}

		that.makeValid = function(){
			$(el).removeClass('field-item--error');
			$(el).addClass('field-item--correct');
		}
		that.makeInvalid = function(){
			$(el).addClass('field-item--error');
			$(el).removeClass('field-item--correct');
		}

		$(inp).focus(function(){
				$(el).addClass('field-item--focused');
				$(el).removeClass('field-item--error');
				$(el).removeClass('field-item--correct');
				opt.onFocus(this);
		});
		$(inp).blur(function(){
			$(el).removeClass('field-item--focused');

			if (opt.validateOnBlur) {
				that.makeValidate();
			}
			opt.onBlur(this);
		});

		$(inp).keyup(function(){
			console.log('keyup', inp.val());
			opt.onType(this);
		});


}


field = new FieldConstructor({
	componentName: 'fieldInput',
	type: 'input',
	required: true,
	placeholderText: 'placeholderText',
	errorMessage: 'errorMessage',
	correctMessage: 'correctMessage',
	name: 'name',
	id: '1',
	validateOnBlur:true,
	onBlur:function(el){
		console.log("my blur", el);
	}
});



//console.log('field', field);


$('#my_form').append(field.el);



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



});
