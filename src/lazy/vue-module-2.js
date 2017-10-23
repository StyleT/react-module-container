// there can be your
// import of Vue.js
import ModuleRegistry from '../module-registry';

// Router
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>&nbsp;bar</div>' }

const routes = [
    { path: '/vue-router-app7/foo', component: Foo },
    { path: '/vue-router-app7/bar', component: Bar }
];

ModuleRegistry.registerComponent('MyApp7.VueComponent1', () => {
    const router = new VueRouter({
        routes, // сокращение от `routes: routes`
        mode: "history", // todo: what todo with
        // # relative router
        // # not an html5 history
    });

    return new Vue({
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
    });
});
