<form class="form" action="">

	<div   class="field-item field-item--error">
		<input id="firstname" type="text" />

		<div class="error-notifier">
			Заполните поле
		</div><!-- /.error-notifier -->
		<div class="correct-notifier">
			Заполнено верно
		</div><!-- /.correct-notifier -->

		<label for="firstname">
			Ваше имя
		</label>
	</div><!-- /.field-item -->
	<div   class="field-item field-item--correct">
		<input id="firstname" type="text" />

		<div class="error-notifier">
			Заполните поле
		</div><!-- /.error-notifier -->
		<div class="correct-notifier">
			Заполнено верно
		</div><!-- /.correct-notifier -->

		<label for="firstname">
			Ваше фамилия
		</label>
	</div><!-- /.field-item -->
	<div  class="field-item">
		<input id="firstname" type="text" />
		<div class="error-notifier">
			Заполните поле
		</div>
		<div class="correct-notifier">
			Заполнено верно
		</div>
		<label for="firstname">
			Ваше очество
		</label>
	</div>
</form>

<hr />

<form action="" id="my_form" class="form">
	<field-item
	      v-for="item in fields"
	      v-bind:todo="item"
 
	      v-bind:key="item.id">
	</field-item>
</form><!-- /.form -->

