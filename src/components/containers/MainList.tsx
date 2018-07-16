import { connect } from 'react-redux';
import { IState } from '../../reducers';
import MainList from '../MainList';

const mapStateToProps = (state: IState) => ({
    taskItems: state.taskItems.items,
})

export default connect<any, any, any>(mapStateToProps)(MainList);