import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'decko';

import './Spinner.styl';

const isDev = process.env.NODE_ENV === 'development';
const SPINNER_DELAY = isDev ? 500 : 2400;

function generateRhombusChildren(num) {
    return Array.from({ length: num }).map((val, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className={`rhombus child-${index + 1}`} />
    ));
}

class Spinner extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        isActive: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isActive: props.isActive
        };
    }

    componentDidUpdate(prevProps) {
        const { isActive } = this.props;

        if (isActive !== prevProps.isActive && isActive === false) {
            this.handleActiveState();
        } else if (isActive !== prevProps.isActive && isActive === true) {
            this.setState({ isActive: true });
        }
    }

    // TODO: need to do a smart delay
    // @debounce(SPINNER_DELAY)
    handleActiveState() {
        this.setState({ isActive: false });
    }

    render() {
        const { children } = this.props;
        const { isActive } = this.state;

        return isActive ? (
            <div className="spinner-wrapper">
                <div className="spinner breeding-rhombus-spinner">
                    {generateRhombusChildren(8)}

                    <div className="rhombus big" />
                </div>
            </div>
        ) : (
            children
        );
    }
}

export default Spinner;
