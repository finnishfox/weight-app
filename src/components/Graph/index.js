import {getMeasurements} from './Graph.selectors';
import { connect } from 'react-redux';
import Graph from "./Graph";

const mapStateToProps = (state, props) => ({
    measurements: getMeasurements(state, props.userId),
});

export default connect(mapStateToProps)(Graph);

