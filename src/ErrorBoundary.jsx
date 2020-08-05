import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        console.log(new Error(error), info)
    }
    render() {
        if(this.state.hasError) return <h1 style={{color: 'white'}}>Something went wrong, try reloading the page</h1> 
        else return this.props.children
    }
}