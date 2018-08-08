import * as React from "react";
import { connect } from "react-redux";
import { INode, SingleNode } from "../models/Node";
import { List, Container } from "semantic-ui-react";
import { v1 } from "uuid";
import { IState } from "../reducers";
import NewNodeButton from "./NewNodeButton";
import ConnectedNodeFrame from "./connectedComponents/ConnectedNode";

export interface IProps {
  nodeId: string;
  node: INode;
  childrenIDs: string[];
}

export class NodeFrame extends React.Component<IProps> {
  public renderMyChilds() {
    const { childrenIDs } = this.props;
    if (!childrenIDs || childrenIDs.length === 0) {
      return;
    }

    return (
      <List>
        {childrenIDs.map(id => {
          return (
            <List.Item key={id}>
              <ConnectedNodeFrame nodeId={id} />
            </List.Item>
          );
        })}
      </List>
    );
  }

  public render(): any {
    const { node } = this.props;
    if (node === undefined) {
      throw new Error(" passed undefined {node} to NodeFrame");
    }

    return (
      <List.Item style={{ minWidth: "500px", backgroundColor: "yellow" }}>
        <div style={{ minWidth: "500px", display: "inline" }}>
          <div style={{ padding: "0 12px", border: "1px solid black" }} >
            <div style={{ display: "inline-flex" }}>
              <div >
                <List.Header>
                  {node.header} ++Id: {node.Id}
                </List.Header>
                <List.Description>
                  {node.description} | parent:{" "}
                  {node.parentID ? node.parentID : "(i dont have any parents)"}
                </List.Description>
              </div>
              <div style={{}}>
                <NewNodeButton nodeId={this.props.nodeId} />
              </div>
            </div>
            {this.renderMyChilds()}
          </div>
        </div>
      </List.Item>
    );
  }
}
