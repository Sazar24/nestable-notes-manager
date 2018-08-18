/*
Wrapper:
props: 
{
    Id
}

w connect`ie sprawdza (porównuje z tablicą ze store`a) czy dane Id jest w trybie edycji

*/

import * as React from 'react';
import { connect } from "react-redux";
import { IState } from '../../reducers';
import NodeEditMode from './NodeEditMode';
import ConnectedNodeWithChildren from './connectedComponents/ConnectedNode';

interface IProps {
    Id: string,
    editMode: boolean
}
class NodeWrapper extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { editMode } = this.props;
        return (
            <div>
                {editMode && (
                    <NodeEditMode />
                )}

                {editMode && (
                    <ConnectedNodeWithChildren />
                )}
            </div>
        )
    }


}

const mapStateToProps = (state: IState, ownProps: IProps) => ({
    editMode: true,

})

const ConnectedNodeWrapper = connect<any, any, any>(mapStateToProps)(NodeWrapper);
export default ConnectedNodeWrapper;