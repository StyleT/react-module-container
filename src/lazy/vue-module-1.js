// there can be your
// import of Vue.js
import ModuleRegistry from '../module-registry';

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
});


ModuleRegistry.registerComponent('MyApp6.VueComponent1', () => new Vue({
    data: {
        props: Object,
    },
    template: `<div title="This is from Vue.js"><ol>
        <!--
          Теперь мы можем передать каждому компоненту todo объект
          с информацией о задаче, который будет динамически меняться.
          Мы также определяем для каждого компонента "key",
          значение которого будет объяснено далее в руководстве.
        -->
        <todo-item
                v-for="item in props.groceryList"
                v-bind:todo="item"
                v-bind:key="item.id">
        </todo-item>
        <li>from resolve: <strong>{{props.customData.user}}</strong></li>
        <li>from react: <strong>{{props.value}}</strong></li>
      </ol>
      <module-registry component="Hello" :props="props" title="This is injection React in Vue"></module-registry>
      <br/>
      <router-link to="/ng-router-app/a" class="test-class">to /ng-router-app/a</router-link>
</div>`
}));
