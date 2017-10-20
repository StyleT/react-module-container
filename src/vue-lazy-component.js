import React from 'react';
import PropTypes from 'prop-types';
import {render, unmountComponentAtNode} from 'react-dom';
import {unloadStyles} from './tag-appender';
import ModuleRegistry from './module-registry';
import BaseLazyComponent from './base-lazy-component';

class AddRouterContext extends React.Component {
    getChildContext() {
        return {router: this.props.router};
    }

    render() {
        return this.props.children;
    }
}

AddRouterContext.childContextTypes = {
    router: PropTypes.any
};
AddRouterContext.propTypes = {
    router: PropTypes.any,
    children: PropTypes.any
};

class VueLazyComponent extends BaseLazyComponent {

    componentDidMount() {
        this.mounted = true;
        this.resourceLoader.then(() => {
            if (!this.mounted) {
                return;
            }
            this.vm = ModuleRegistry.component(this.manifest.component);
            this.vm.$data.props = this.mergedProps;
            const component = this.vm.$mount();
            this.node.appendChild(component.$el);

            const Vue = this.vm.constructor;

            // $provide.factory('props', () => () => this.mergedProps);
            // // Todo: create sub component
            // Vue.component('module-registry', {
            //
            // });
            // $compileProvider.directive('moduleRegistry', () => ({
            //     scope: {component: '@', props: '<'},
            //     controller: ($scope, $element) => {
            //         const Component = ModuleRegistry.component($scope.component);
            //         $scope.$watch(() => $scope.props, () => {
            //             render(
            //                 <AddRouterContext router={this.props.router}>
            //                     <Component {...$scope.props}/>
            //                 </AddRouterContext>, $element[0]);
            //         }, true);
            //         $scope.$on('$destroy', () => unmountComponentAtNode($element[0]));
            //         //super hack to prevent angular from preventing external route changes
            //         $element.on('click', e => e.preventDefault = () => delete e.preventDefault);
            //     }
            // }));

            // // Todo: create another component
            // $compileProvider.directive('routerLink', () => ({
            //     transclude: true,
            //     scope: {to: '@'},
            //     template: '<a ng-href="{{to}}" ng-click="handleClick($event)"><ng-transclude></ng-transclude></a>',
            //     controller: $scope => {
            //         $scope.handleClick = event => {
            //             if (event.ctrlKey || event.metaKey || event.shiftKey || event.which === 2 || event.button === 2) {
            //                 return;
            //             } else {
            //                 this.props.router.push($scope.to);
            //                 event.preventDefault();
            //             }
            //         };
            //     }
            // }));

        });
    }

    componentWillUnmount() {
        debugger
        this.mounted = false;
        this.vm.$destroy();
        // if (this.vm) {
        //     const vm = this.vm;
        //     setTimeout(() => {
        //         debugger;
        //         vm.$destroy()
        //     }, 100);
        // }
        if (this.manifest.unloadStylesOnDestroy !== false) {
            unloadStyles(document, this.manifest.files);
        }
        super.componentWillUnmount();
    }

    componentDidUpdate() {
        if (this.vm) {
            this.vm.$data.props = this.mergedProps
        }
    }

    render() {
        return (<div ref={node => this.node = node} />);
    }
}

VueLazyComponent.propTypes = {
    router: PropTypes.any
};

export default VueLazyComponent;
