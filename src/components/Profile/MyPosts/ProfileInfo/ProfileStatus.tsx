import React from "react";

type ProfileStatusPropsType = {
    status: string
}

export class ProfileStatus extends React.Component <ProfileStatusPropsType> {
    state = {
        editMode: false
    }

    activateEditMode = () => {
        debugger
        console.log(this)
        this.setState({editMode: true})
        this.forceUpdate()
    }

    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.forceUpdate()
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>
                            {this.props.status}
                        </span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onBlur={this.deactivateEditMode}
                               value={this.props.status}
                               autoFocus>
                        </input>
                    </div>
                }
            </div>
        )
    }
}