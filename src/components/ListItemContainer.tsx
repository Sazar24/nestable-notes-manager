import * as React from 'react';
import { Container, Input, List, } from 'semantic-ui-react';
import ContextMenuButton from './ContextMenuButton';

interface IProps {
    children: string;
}

interface IState {
    userIsEdditng: boolean,
}

class ListItemContainer extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        // let isDone: boolean = false;
        this.state = {
            userIsEdditng: false,
        }
    }

    public toggleEdit = () => {
        // toggleEdit() {
        // const { userIsEdditng :boolean, state :any} = this.state;
        this.setState({
            ...this.state,
            userIsEdditng: !this.state.userIsEdditng,
        })
    }

    public render() {
        const userIsEdditng: boolean = this.state.userIsEdditng;
        // const {userIsEdditng: boolean} = this.state.userIsEdditng;
        if (userIsEdditng) {
            return (
                <div onBlur={this.toggleEdit}>
                    <Container
                        fluid={true}
                    // onBlur={this.toggleEdit}
                    >
                        <Input
                            placeholder="put your not here"
                            autoFocus={true}
                        />
                        <Input
                            placeholder="put your not here"
                            autoFocus={true}
                        />
                        <ContextMenuButton />
                    </Container>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div onClick={this.toggleEdit} >
                        <List.Header>
                            {this.props.children}
                        </List.Header>
                    </div>
                    <List.Description >
                        I am description of: {this.props.children}
                        <ContextMenuButton />
                    </List.Description>
                </div>
            )
        }
    }
}
export default ListItemContainer;