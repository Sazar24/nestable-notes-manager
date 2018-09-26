import * as React from "react";
import { connect } from "react-redux";
import { Node } from "../../models/Node";
import { List, Button, Icon } from "semantic-ui-react";
import NodesManager from "../../services/NodesManager";
import NewNodeButton from "./NewNodeButton";
import NodeContentWithoutChildren from "./NodeContentWithoutChildren";
import { IGlobalReduxState } from "../../reducers/index";
import Toolbar from "./Toolbar";

export interface IProps {
  nodeId: string;
  node: Node;
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

  // handleClick = (event: Event) => {
  //   event.stopPropagation();
  //   this.toggleSelected();
  // }

  render(): any {
    const { node, nodeId } = this.props;
    if (node === undefined) {
      throw new Error("passed undefined {node} to NodeFrame");
    }

    return (
      <List.Item style={{
        minWidth: "90%",
        padding: "0 0 0 8px",
        border: "2px solid black",
        marginBottom: "2px",
        display: "inherit",
        backgroundColor: this.state.bgcolor
        // clear: "both"
      }}
      // onClick={(e: any) => this.handleClick(e)}
      >

        <div style={{ display: "inline-flex", width: "100%" }} >
          <NodeContentWithoutChildren node={node} />
          <Toolbar  node={node} />
          {/* <NewNodeButton nodeId={nodeId} />
          <Button onClick={() => this.toggleSelected()} circular={true}>
            <Icon name="lightbulb" bordered={false}/>
          </Button> */}
        </div>
        {this.renderMyChilds()}
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