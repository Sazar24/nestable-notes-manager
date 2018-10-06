import * as React from "react";
import { connect } from "react-redux";
import { Node } from "../../models/Node";
import { List, Button, Icon } from "semantic-ui-react";
import NodesManager from "../../services/NodesManager";
import NewNodeButton from "./NewNodeButton";
import NodeContentWithoutChildren from "./NodeContentWithoutChildren";
import { IGlobalReduxState } from "../../reducers/index";
import Toolbar from "./Toolbar";
import MyChildrenOrSpacer from "./ChildrenOrSpacer";

export interface IProps {
  nodeId: string;
  node: Node;
  childrenIDs: string[];
}

interface IState {
  bgcolor: string;
  showChildren: boolean;
}

export class NodeWithChildren extends React.Component<IProps, IState> {
  private selectedOnColor: string = "#08e8ff";
  private selectedOffColor: string = "silver";

  constructor(props: any) {
    super(props);
    this.state = {
      bgcolor: this.selectedOffColor,
      showChildren: true
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
    const { showChildren } = this.state;
    this.setState({
      showChildren: !showChildren,
    });
  }

  handleClick = (event: Event) => {
    this.toggleSelected();
  }

  render(): any {
    const { node, nodeId } = this.props;
    const { showChildren } = this.state;
    const iHaveKids: boolean = (this.props.childrenIDs.length > 0) ? true : false;

    if (node === undefined) {
      throw new Error("passed undefined {node} to NodeFrame");
    }

    return (
      <List.Item style={{
        backgroundColor: this.state.bgcolor,
        minWidth: "90%",
        padding: "0 0 0 8px",
        border: "2px solid black",
        marginBottom: "2px",
        display: "inherit"
      }} >
        <div style={{ display: "inline-flex", width: "100%" }} >
          {iHaveKids && <Icon
            onClick={this.handleClick}
            name={(showChildren) ? "caret right" : "caret down"} />
          }
          <NodeContentWithoutChildren node={node} />
          <Toolbar node={node} />
        </div>

        <MyChildrenOrSpacer nodeId={nodeId} showChildren={showChildren} />
      </List.Item>
    );
  }
}

const mapStateToProps = (state: IGlobalReduxState, ownProps: IProps) => ({
  node: new NodesManager().findNode(ownProps.nodeId, state.nodes),
  childrenIDs: new NodesManager().findChildrensIds(ownProps.nodeId, state.nodes)
})

const ConnectedNodeWithChildren = connect<any, any, any>(mapStateToProps)(NodeWithChildren);
export default ConnectedNodeWithChildren;