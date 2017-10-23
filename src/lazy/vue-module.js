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

// Router
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
    { path: '/vue-router-app7/foo', component: Foo },
    { path: '/vue-router-app7/bar', component: Bar }
];

const router = new VueRouter({
    routes, // сокращение от `routes: routes`
    mode: "history", // todo: what todo with
    // # relative router
    // # not an html5 history
});

ModuleRegistry.registerComponent('MyApp7.VueComponent1', () => new Vue({
    router,
    template: `<div>
  <h1>Hello App!</h1>
  <p>
    <!-- use router-link component for navigation. -->
    <!-- specify the link by passing the \`to\` prop. -->
    <!-- <router-link> will be rendered as an \`<a>\` tag by default -->
    <!-- !! router-link was a component from VueRouter but !! -->
    <!-- !! router-link is a component from react-module-container !! -->
    <router-link to="/vue-router-app7/foo">Go to Foo</router-link>
    <router-link to="/vue-router-app7/bar">Go to Bar</router-link>
  </p>
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view></router-view>
</div>`
}));
