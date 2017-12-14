'use strict';
window.templates = Object.create(null);
window.templates['templates/init.html'] = '{{renderAllComponents}}\n<div v-for="field in fieldsList">\n	<component :is="field.name"></component>\n</div>';
window.templates['templates/input.html'] = '<div  class="field-item">\n	<input v-model="value" v-bind:name="name" v-bind:id="id" v-bind:type="type" />\n	<div class="error-notifier">\n		{{errorMessage}}\n	</div>\n	<div class="correct-notifier">\n		{{correctMessage}}\n	</div>\n	<label v-bind:for="id">\n		{{placeholderText}}\n	</label>\n</div>';
window.templates['templates/textarea.html'] = '<div  class="field-item">\n	<textarea v-model="value" v-bind:name="name" v-bind:id="id" v-bind:type="type" ></textarea>\n	<div class="error-notifier">\n		{{errorMessage}}\n	</div>\n	<div class="correct-notifier">\n		{{correctMessage}}\n	</div>\n	<label v-bind:for="id">\n		{{placeholderText}}\n	</label>\n</div>';
