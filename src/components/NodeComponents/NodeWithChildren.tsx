import * as React from "react";
import { connect } from "react-redux";
import { INode, SingleNode } from "../../models/Node";
import { List, Container, Button } from "semantic-ui-react";
import { v1 } from "uuid";
import NodesManager from "../../services/NodesManager";
import NewNodeButton from "./NewNodeButton";
import NodeContentWithoutChildren from "./NodeContentWithoutChildren";
import { IGlobalReduxState } from "../../reducers/index";

export interface IProps {
  nodeId: string;
  node: INode;
  childrenIDs: string[];
}

interface IState {
  bgcolor: string;
  selected: boolean;
}

export class NodeWithChildren extends React.Component<IProps, IState> {
  private selectedOnColor: string = "#08e8ff";
  private selectedOffColor: string = "silver";

  constructor(props: any) {
    super(props);
    this.state = {
      bgcolor: this.selectedOffColor,
      selected: false
    }
  }


  renderMyChilds() {
    const { childrenIDs } = this.props;
    if (!childrenIDs || childrenIDs.length === 0) {
      return;
    }

    return (
      <List>
        {childrenIDs.map(id => {
          return (
            <List.Item key={id}>
              <ConnectedNodeWithChildren nodeId={id} />
            </List.Item>
          );
        })}
      </List>
    );
  }

  changeBackgroundColor(isToggled: boolean) {
    if (isToggled)
      this.setState({ bgcolor: this.selectedOnColor })
    else
      this.setState({ bgcolor: this.selectedOffColor });
  }

  toggleSelected() {
    const { selected } = this.state;
    this.changeBackgroundColor(!selected);
    this.setState({
      selected: !selected,
    });
  }

  handleClick = (event: Event) => {
    event.stopPropagation();
    this.toggleSelected();
  }

  render(): any {
    const { node } = this.props;
    if (node === undefined) {
      throw new Error("passed undefined {node} to NodeFrame");
    }

    return (
      <List.Item style={{
        // minWidth: "500px",
        minWidth: "90%",
        padding: "0 0 0 8px",
        border: "2px solid black",
        marginBottom: "2px",
        display: "inherit",
        // backgroundColor: "silver",
        backgroundColor: this.state.bgcolor
        // clear: "both"
      }}
        // onClick={() => this.handleClick()}
        onClick={(e: any) => this.handleClick(e)}
      >

        <div style={{ display: "inline-flex", width: "100%", }} >
          <NodeContentWithoutChildren node={node} />
          <NewNodeButton nodeId={this.props.nodeId} />
        </div>
        {this.renderMyChilds()}
      </List.Item>
    );
  }
}

const mapStateToProps = (state: IGlobalReduxState, ownProps: IProps) => ({
  node: state.nodes[ownProps.nodeId],
  childrenIDs: new NodesManager().findChildrensIds(ownProps.nodeId, state)
})

const ConnectedNodeWithChildren = connect<any, any, any>(mapStateToProps)(NodeWithChildren);
export default ConnectedNodeWithChildren;