// there can be your
// import of Vue.js
import ModuleRegistry from '../module-registry';

Vue.component('todo-item', {
    // Компонент todo-item теперь принимает
    // "prop", то есть пользовательский параметр.
    // Этот параметр называется todo.
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
});


ModuleRegistry.registerComponent('MyApp6.VueComponent1', () => new Vue({
    data: {
        props: Object,
    },
    template: `      <ol>
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
      </ol>`
}));
