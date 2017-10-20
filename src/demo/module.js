/* global React, AngularLazyComponent, ReactLazyComponent, ModuleRegistry */
import {Link} from 'react-router';
import PropTypes from 'prop-types';

export class MyNgComp extends AngularLazyComponent {
  constructor(props) {
    super(props, {
      files: [`${props.topology.staticsUrl}angular-module.bundle.js`],
      module: 'myApp',
      component: 'my-comp'
    });
  }
}

export class MyNgComp2 extends AngularLazyComponent {
  constructor(props) {
    super(props, {
      files: [`${props.topology.staticsUrl}angular-module.bundle.js`],
      resolve: () => {
        const experimentsPromise = Promise.resolve({'specs.fed.ReactModuleContainerWithResolve': true});
        const customDataPromise = Promise.resolve({user: 'xiw@wix.com'});
        return Promise.all([experimentsPromise, customDataPromise]).then(results => {
          return {
            experiments: results[0],
            customData: results[1]
          };
        });
      },
      module: 'myApp2',
      component: 'my-comp'
    });
  }
}

export class MyReactComp extends ReactLazyComponent {
  constructor(props) {
    super(props, {
      files: [`${props.topology.staticsUrl}react-module.bundle.js`],
      resolve: () => {
        const experimentsPromise = Promise.resolve({'specs.fed.ReactModuleContainerWithResolve': true});
        const customDataPromise = Promise.resolve({user: 'xiw@wix.com'});
        return Promise.all([experimentsPromise, customDataPromise]).then(results => {
          return {
            experiments: results[0],
            customData: results[1]
          };
        });
      },
      component: 'MyApp3.RealReactComp'
    });
  }
}

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {counter: 0};
  }

  handleClick() {
    this.setState({counter: this.state.counter + 1});
  }

  render() {
    return (<div title={"This is native react component"} style={{border: '1px solid yellow'}}>
      <div onClick={() => this.handleClick()}>
        <div>React Counter (click me): <span id="counter">{this.state.counter}</span>!!!</div>
        <div id="value-in-react">{this.props.value}</div>
      </div>
      <div>
        <Link className={'react-link'} to="/ng-router-app/a">ng-route-app</Link>&nbsp;
        <Link className={'react-link'} to="/ui-router-app/">ui-route-app</Link>&nbsp;
        <Link className={'react-link'} to="/vue-router-app7/bar">vue-router-app7/bar</Link>&nbsp;
      </div>
    </div>);
  }
}
Hello.propTypes = {
  value: PropTypes.string
};

export class MyNgComp4 extends AngularLazyComponent {
  constructor(props) {
    super(props, {
      files: [
        `${props.topology.staticsUrl}angular-module.bundle.js`,
        `${props.topology.baseUrl}demo-shared.css`,
        `${props.topology.baseUrl}demo-4.css`
      ],
      module: 'myApp4',
      component: 'my-comp'
    });
  }
}

export class MyNgComp5 extends AngularLazyComponent {
  constructor(props) {
    super(props, {
      unloadStylesOnDestroy: true,
      files: [
        `${props.topology.staticsUrl}angular-module.bundle.js`,
        `${props.topology.baseUrl}demo-shared.css`,
        `${props.topology.baseUrl}demo-5.css`
      ],
      module: 'myApp5',
      component: 'my-comp'
    });
  }
}

export class MyNgApp5NoUnloadCss extends MyNgComp5 {
  constructor(props) {
    super(props);
    this.manifest.unloadStylesOnDestroy = false;
  }
}

export class MyVueCompApp6 extends VueLazyComponent {
    constructor(props) {
        super(props, {
            files: [`${props.topology.staticsUrl}vue-module.bundle.js`],
            resolve: () => {
                const experimentsPromise = Promise.resolve([
                    { id: 0, text: 'Овощи' },
                    { id: 1, text: 'Сыр' },
                    { id: 2, text: 'Что там ещё люди едят?' }
                ]);
                const customDataPromise = Promise.resolve({user: 'xiw@wix.com'});
                return Promise.all([experimentsPromise, customDataPromise]).then(results => {
                    return {
                        groceryList: results[0],
                        customData: results[1]
                    };
                });
            },
            component: 'MyApp6.VueComponent1'
        });
    }
}

export class MyVueCompApp7 extends VueLazyComponent {
    constructor(props) {
        super(props, {
            files: [`${props.topology.staticsUrl}vue-module.bundle.js`],
            component: 'MyApp7.VueComponent1'
        });
    }
}

ModuleRegistry.registerComponent('MyApp.MyNgComp', () => MyNgComp);
ModuleRegistry.registerComponent('MyApp2.MyNgComp', () => MyNgComp2);
ModuleRegistry.registerComponent('MyApp3.MyReactComp', () => MyReactComp);
ModuleRegistry.registerComponent('Hello', () => Hello);
ModuleRegistry.registerComponent('MyApp4.MyNgComp', () => MyNgComp4);
ModuleRegistry.registerComponent('MyApp5.MyNgComp', () => MyNgComp5);
ModuleRegistry.registerComponent('MyApp5NoUnloadCss.MyNgComp', () => MyNgApp5NoUnloadCss);
ModuleRegistry.registerComponent('MyApp6.MyVueComp', () => MyVueCompApp6);
ModuleRegistry.registerComponent('MyApp7.MyVueComp', () => MyVueCompApp7);
