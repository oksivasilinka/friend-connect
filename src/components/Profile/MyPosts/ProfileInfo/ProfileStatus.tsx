import React, {ChangeEvent} from "react";

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component <ProfileStatusPropsType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
        this.props.updateStatus(this.state.status)
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: ProfileStatusPropsType, prevState: ProfileStatusPropsType) {
        if (prevProps.status !== this.props.status)
            this.setState({
                status: this.props.status
            })
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <h4>Статус: </h4>
                        <span onDoubleClick={this.activateEditMode}>
                            {this.state.status || 'no status'}
                        </span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange}
                               onBlur={this.deactivateEditMode}
                               value={this.state.status}
                               autoFocus>
                        </input>
                    </div>
                }
            </div>
        )
    }
}