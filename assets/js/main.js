//Main JS
var formSending = false;
var files = '';
var data;

F = '';
$(function () {

	$('.form .field-item').focusin(function () {
		$(this).addClass("field-item--focused");
		//$(this).find('input').focus();
	});

	$('.form .field-item').focusout(function () {
		if ($(this).find('input').val() == '') {
			$(this).removeClass("field-item--focused");
		};
	});


	var fieldsTemplates = {
		"input": [
			'<div  class="field-item">',
			'<input v-bind:name="todo.name" v-bind:id="todo.id" v-bind:type="todo.type" />',
			'<div class="error-notifier">',
			'{{todo.errorMessage}}',
			'</div>',
			'<div class="correct-notifier">',
			'{{todo.correctMessage}}',
			'</div>',
			'<label v-bind:for="todo.id">',
			'{{todo.placeholderText}}',
			'</label>',
			'</div>'
		],
		"textarea": [
			'<div  class="field-item">',
			'<textarea v-bind:name="todo.name" v-bind:id="todo.id" v-bind:type="todo.type"></textarea>',
			'<div class="error-notifier">',
			'{{todo.errorMessage}}',
			'</div>',
			'<div class="correct-notifier">',
			'{{todo.correctMessage}}',
			'</div>',
			'<label v-bind:for="todo.id">',
			'{{todo.placeholderText}}',
			'</label>',
			'</div>'
		]
	}

	Vue.component('field-item', {
		model: {
			type: '',
		},
		props: ['todo'],
		template: (fieldsTemplates['textarea']).join(''),

		/*render: function (createElement) {


			var el = $($.parseHTML(fieldsTemplates[this.todo.type].join(''))).contents();
			

			el.




			console.log(el[0]);
			return createElement('div',{}, el);
			//this.$slots.default // массив потомков;


		},*/
		/*props: {

			todo: {
				type: Object,
				required: true
			}
		}*/

	});

	F = new Vue({
		el: '#my_form',
		data: {
			fields: [{
				id: 0,
				type: 'input',
				required: 'name',
				placeholderText: 'Введите ваше имя',
				errorMessage: 'Пожалуйста, введите ваше имя',
				correctMessage: 'Поле заполнено правильно',
				name: 'user-name'
			}, {
				id: 1,
				type: 'textarea',
				required: 'name',
				placeholderText: 'Введите ваше имя2',
				errorMessage: 'Пожалуйста, введите ваше имя',
				correctMessage: 'Поле заполнено правильно',
				name: 'user-name'
			}]
		}
	})




	/*var form1 = new Forms({
		formClass: 'form1',
		liveValidation: true,
		submitText: 'Отправить',
		submitingTet: 'Отправка',
		fields: [{
			type: 'input',
			required: 'name',
			placeholderText: 'Введите ваше имя',
			errorMessage: 'Пожалуйста, введите ваше имя',
			correctMessage: 'Поле заполнено правильно',
			name: 'user-name'
		}, {
			type: 'input',
			required: 'email',
			placeholderText: 'Введите ваше e-mail',
			errorMessage: 'Пожалуйста, введите ваш e-mail',
			correctMessage: 'Поле заполнено правильно',
			name: 'user-email'
		}, {
			type: 'textarea',
			required: '',
			placeholderText: 'Введите сообщение',
			errorMessage: '',
			correctMessage: '',
			name: 'user-message'
		}],
		onSendSuccess: function () {
			alert('Успешно отправлено');
		},

		onSendError: function () {
			alert('Неуспешно отправлено');
		}
	});*/









	$('form.send .btn').click(function () {
		send($(this));
	});
	$("form.send input").keypress(function (e) {
		if (e.keyCode == 13) {
			send($(this));
		}
	});

	function send(handel) {
		if (formSending) return;
		var hasError = false;
		if (!validation(handel.parents('form').find('input[name=name]'))) {
			hasError = true;
		}

		if (!validation(handel.parents('form').find('input[name=email]'))) {
			hasError = true;
		}
		if (!validation(handel.parents('form').find('input[name=phone]'))) {
			hasError = true;
		}
		if (!validation(handel.parents('form').find('input[name=agree]'))) {
			hasError = true;
		}

		if (hasError == false) {
			data = '';

			data = new FormData();
			if (files != '') {
				$.each(files, function (key, value) {
					data.append(key, value);
				});
				console.log('data');
				console.log(data);
			}
			//data.append( 'identification', 'Заявка - Бесплатный вызов дизайнера–замерщика' );
			var msg = handel.parents('form').serializeArray();
			$.each(msg, function () {
				data.append($(this)[0]['name'], $(this)[0]['value']);
			});

			var current_btn = handel.parents('form').find('.btn');
			formSending = true;
			var btn_text = current_btn.text();

			current_btn.text('Отправка...');
			$.ajax({
				type: 'POST',
				url: location.pathname + "/subscribe/subscribe.php",
				// data: msg,
				data: data,
				//dataType: 'json',
				processData: false, // Не обрабатываем файлы (Don't process the files)
				contentType: false, // Так jQuery скажет серверу что это строковой запрос
				success: function (data) {
					window.location.hash = "order";
					if (data != '') {
						handel.parent('form').find('[type=text]').val('');
						handel.parent('form').find('textarea').val('');
						$('.file-list').text('');
						//var goalIdent = handel.parent( 'form' ).find( '[name="goal-ident"]' ).val();
						$('.file').val('');
						try {
							var yaCounter24617048 = new Ya.Metrika({
								id: 24617048
							});
							yaCounter24617048.hit("http://clientlab.ru/#order");
							ga("send", "event", "form", "send")
							console.log('yaCounter24617048.hit("http://clientlab.ru/#order")', 'ga("send", "event", "form", "send")');
						} catch (ex) {}
						window.setTimeout(function () {
							window.location.hash = ""
						}, 2E3)
						$.arcticmodal('close');

						handel.parents('form').find('input[type="text"]').val('');
						handel.parents('form').find('input[type="tel"]').val('');
						handel.parents('form').find('input[type="email"]').val('');
						handel.parents('form').find('textarea').text('');

						if (handel.parents('form').attr('id') == 'question_form') {

							$('#thanks_comment').arcticmodal();
						} else {

							$('#thanks').arcticmodal();
						}

					} // if data not empty
					formSending = false;
					current_btn.text(btn_text);
				},
				error: function (xhr, str) {
					current_btn.text(btn_text);
					alert('Возникла ошибка: ' + xhr.responseCode);
				}
			});
		}
	}
	$('input').click(function () {
		$(this).removeClass('error');
	});



	function validation(input) {
		if (input.hasClass('required')) {
			if (input.hasClass('user-name')) {
				var name = '';
				name = input.val();
				if (name.length < 3) {
					input.addClass('error');

					var err_mes = input.data('error');
					input.attr('placeholder', err_mes);

					return false;
				} else {
					return true;
				}
			}
			if (input.hasClass('user-email')) {
				var email = '';
				email = input.val();
				var reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (reEmail.test(email)) {
					return true;
				} else {
					input.addClass('error');

					var err_mes = input.data('error');
					input.attr('placeholder', err_mes);

					return false;
				}
			}
			if (input.hasClass('user-phone')) {
				var phone = '';
				phone = input.val();
				var reNumb = /^[0-9()-+- ]+$/;
				if (phone.length >= 6 && reNumb.test(phone)) {
					return true;
				} else {
					input.addClass('error');

					var err_mes = input.data('error');
					input.attr('placeholder', err_mes);

					return false;
				}
			}
			if (input.hasClass('fill')) {
				var fill = '';
				fill = input.val();
				if (fill.length >= 4) {
					return true;
				} else {
					input.addClass('error');

					return false;
				}
			}
			if (input.hasClass('user-agree')) {
				var agree = input.prop('checked'); // tru/false
				if (agree) {
					return true;
				} else {
					input.addClass('error');


					return false;
				}
			}
		} else {
			return true;
		}
	} //end valdation



}); //end onload