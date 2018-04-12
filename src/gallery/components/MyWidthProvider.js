import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

function sortBreakpoints (breakpoints) {
    const keys = Object.keys(breakpoints);
    return keys.sort(function(a, b) {
        return breakpoints[a] - breakpoints[b];
    });
}

function getBreakpointFromWidth (breakpoints, width) {
    const sorted = sortBreakpoints(breakpoints);
    let matching = sorted[0];

    for (let i = 1, len = sorted.length; i < len; i++) {
        const breakpointName = sorted[i];
        if (width > breakpoints[breakpointName]) matching = breakpointName;
    }

    return matching;
}

export default (ComposedComponent: ReactClass): ReactClass => class extends Component {
    static propTypes = {
        measureBeforeMount: PropTypes.bool
    }

    static defaultProps = {
        measureBeforeMount: true
    }

    state = {
        mounted: false,
        width: 1280
    }

    // mounted: false

    get nodeWidth () {
        return ReactDOM.findDOMNode(this).offsetWidth;
    }

    get currentBreakpoint () {
        const { breakpoints } = this.props;

        return getBreakpointFromWidth(breakpoints, this.nodeWidth);
    }

    calcRowHeight = () => {
        const { cols, margin } = this.props;

        return (this.nodeWidth - (margin[0] * (cols[this.currentBreakpoint] + 1))) / cols[this.currentBreakpoint];
    }

    onWindowResize = (event, cb) => {
        if (!this.mounted) return;

        const rowHeight = this.calcRowHeight();

        this.setState({
            width: this.nodeWidth,
            rowHeight
        }, cb);
    }

    componentDidMount () {
        this.mounted = true;

        window.addEventListener('resize', this.onWindowResize);
        this.onWindowResize();
    }

    componentWillUnmount () {
        this.mounted = false;

        window.removeEventListener('resize', this.onWindowResize);
    }

    render () {
        if (this.props.measureBeforeMount && !this.mounted) {
            return <div className={this.props.className} style={this.props.style} />;
        }

        return <ComposedComponent {...this.props} {...this.state} />;
    }
};