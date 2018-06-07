import * as React from 'react';

export interface EditableLabelState {
  id: string;
  label: string;
  value: string;
  isEditMode: boolean;
}

export interface EditableLabelProps {
  id: string;
  label: string;
  value: string;
  editMode: boolean;
  onUpdate: (newValue: string) => void;
}

export class EditableLabelComponent extends React.Component<EditableLabelProps, EditableLabelState> {

  readonly state: EditableLabelState;

  constructor(props: EditableLabelProps) {
    super(props);
    this.state = {
      id: this.props.id,
      label: this.props.label,
      value: this.props.value,
      isEditMode: this.props.editMode
    };
  }

  private update(event: React.ChangeEvent<HTMLInputElement>): void {
    this.props.onUpdate(event.target.value);
  }

  public componentDidUpdate(prevProps: EditableLabelProps, state: EditableLabelState): void {
    if (this.props.value !== prevProps.value || this.props.editMode !== prevProps.editMode) {
      this.setState({
        id: this.props.id,
        label: this.props.label,
        value: this.props.value,
        isEditMode: this.props.editMode
      });
    }
  }

  render(): JSX.Element {
    return (
      <div>
        {this.state.isEditMode ? (
          <div className="form-group">
            <label htmlFor={this.state.id}>{this.state.label}</label>
            <input className="form-control"
              id={this.state.id}
              value={this.state.value}
              placeholder={this.state.label}
              onChange={this.update.bind(this)} />
          </div>
        ) : (
          <h5>{this.state.value}</h5>
        )}
      </div>
    );
  }
}