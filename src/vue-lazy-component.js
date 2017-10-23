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
            const vm = this.vm = ModuleRegistry.component(this.manifest.component);

            const Vue = this.vm.constructor;

            Vue.component('module-registry', {
                template: `<module-registry ref="self">{{component}}</module-registry>`,
                props: {
                    props: {
                        type: Object,
                        default() {
                            return {};
                        }
                    },
                    component: {
                        type: String,
                        required: true
                    },
                },
                render(createElement) {
                    const vEl = createElement('div', {
                        ref: "self",
                        attrs: this.$attrs,
                        props: this.$props,
                    }, []);
                    // vEl.tag = 'module-registry'; // Todo: use common native HTML tag name (like in angular)
                    this.realRender();
                    return vEl;
                },
                beforeMount() {
                    this.componentFromRegistry = ModuleRegistry.component(this.component);
                },
                mounted() {
                    this.realRender();
                },
                beforeDestroy() {
                    const el = this.$refs.self;
                    this.$nextTick(() => unmountComponentAtNode(el));
                },
                methods: {
                    realRender() {
                        if (!this.$refs.self) {
                            return;
                        }
                        render(
                            <AddRouterContext router={this.props.router}>
                                <this.componentFromRegistry {...this.props}/>
                            </AddRouterContext>,
                            this.$refs.self
                        );
                    }
                },
            });
            // Todo: what do with this comment: //super hack to prevent angular from preventing external route changes
            // about clicks
            //         $element.on('click', e => e.preventDefault = () => delete e.preventDefault);

            const rootRouter = this.props.router;
            Vue.component('router-link', {
                template: `<a :href="to" @click="handleClick"><slot/></a>`,
                props: {
                    to: String,
                },
                methods: {
                    handleClick(event) {
                        if (event.ctrlKey || event.metaKey || event.shiftKey || event.which === 2 || event.button === 2) {
                            return;
                        }
                        const vueRouter = vm.$router;
                        const needUpdateVueRouter = vueRouter && vueRouter.getMatchedComponents(this.to).length;

                        rootRouter.push(this.to);
                        if (needUpdateVueRouter) {
                            vueRouter.replace(this.to);
                        }
                        event.preventDefault();
                    },
                },
            });

            this.vm.$data.props = this.mergedProps;
            // TODO: router initialization with Non first run
            // if (this.vm.$router) {
            //     const to = this.props.location;
            //     this.vm.$router.replace(to);
            // }
            const component = this.vm.$mount();
            this.node.appendChild(component.$el);
        });
    }

    componentWillUnmount() {
        this.mounted = false;
        if (this.vm) {
            this.vm.$destroy();
        }
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
        return (<div ref={node => this.node = node}/>);
    }
}

VueLazyComponent.propTypes = {
    router: PropTypes.any
};

export default VueLazyComponent;
