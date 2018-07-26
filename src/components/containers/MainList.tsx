import { connect } from 'react-redux';
import { IState } from '../../reducers';

import MainList from '../MainList';
import { AddTask } from '../../actions/TaskListActions';

const mapStateToProps = (state: IState) => ({
    nodes: state.nodes.coreNodes,
})

export default connect<any, any, any>(mapStateToProps)(MainList);
// export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MainList);