import * as React from 'react';
import { ITask } from '../models/Task';
import { List } from "semantic-ui-react";
import { v1 } from 'uuid';

interface IProps {
    taskItem: ITask
}

export default class TreeBranch extends React.Component<IProps>{
    public render() {
        const { taskItem } = this.props;
        console.log(taskItem);
        return (
            <div>
                <List.Header>
                    {taskItem.header}
                </List.Header>
                <List.Description>
                    {taskItem.description}
                </List.Description>
            </div>
        )
    }
}