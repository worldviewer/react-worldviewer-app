import React, { Component } from 'react';

// http://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
// We are doing a few things here:
// 1. The asyncComponent function takes an argument; a function (importComponent)
//    that when called will dynamically import a given component. This will make
//    more sense below when we use asyncComponent.
export default function asyncComponent(importComponent) {

	class AsyncComponent extends Component {

		constructor(props) {
			super(props);

			this.state = {
				component: null,
			};
		}

		// 2. On componentDidMount, we simply call the importComponent function that
		//    is passed in. And save the dynamically loaded component in the state.
		async componentDidMount() {
			const { default: component } = await importComponent();

			this.setState({
				component: component
			});
		}

		render() {
			const C = this.state.component;

			// 3. Finally, we conditionally render the component if it has completed
			//    loading. If not we simply render null. But instead of rendering
			//    null, you could render a loading spinner. This would give the user
			//    some feedback while a part of your app is still loading.
			return C
				? <C {...this.props} />
				: null;
		}

	}

	return AsyncComponent;
}
