import React from 'react';
import Calibration from './Calibration';
import Test from './Test';

class TestContainer extends React.Component {
    state = {
        isCalibrated: false
    }

    render() {
        return this.state.isCalibrated ? <Test /> : <Calibration />;
    }
}

export default TestContainer;