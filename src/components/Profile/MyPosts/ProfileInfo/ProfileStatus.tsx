import React from "react";

type ProfileStatusPropsType = {
    status: string
}

export class ProfileStatus extends React.Component <ProfileStatusPropsType> {
    state = {
        editMode: false
    }

    activateEditMode() {
        this.setState({editMode: true})
        this.forceUpdate()
    }

    deactivateEditMode() {
        this.setState({editMode: false})
        this.forceUpdate()
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>
                            {this.props.status}
                        </span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onBlur={this.deactivateEditMode.bind(this)}
                               value={this.props.status}
                               autoFocus>
                        </input>
                    </div>
                }
            </div>
        )
    }
}