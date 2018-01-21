'use strict';
window.templates = Object.create(null);
window.templates['templates/fieldInput.html'] = '<div  class="field-item">\n	<input id="{{id}}" type="{{type}}" value="{{value}}" />\n	<div class="error-notifier">\n		{{errorMessage}}\n	</div>\n	<div class="correct-notifier">\n		{{correctMessage}}\n	</div>\n	<label for="{{id}}">\n		{{placeholderText}}\n	</label>\n</div>\n';
window.templates['templates/fieldTextarea.html'] = '<div  class="field-item">\n	<textarea v-model="value" v-bind:name="name" v-bind:id="id" v-bind:type="type" ></textarea>\n	<div class="error-notifier">\n		{{errorMessage}}\n	</div>\n	<div class="correct-notifier">\n		{{correctMessage}}\n	</div>\n	<label v-bind:for="id">\n		{{placeholderText}}\n	</label>\n</div>\n';
window.templates['templates/init.html'] = '{{renderAllComponents}}\n<div v-for="field in fieldsList">\n	<component :is="field.name"></component>\n</div>';
