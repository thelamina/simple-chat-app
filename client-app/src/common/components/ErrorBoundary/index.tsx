import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	message: string;
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
		message: '',
	};

	public static getDerivedStateFromError(error: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true, message: error.message };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<>
					<h1>Sorry.. there was an error</h1>
					<p>{this.state.message}</p>
					<p>Please try again later</p>
				</>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
