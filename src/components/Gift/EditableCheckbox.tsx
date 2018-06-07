import * as React from 'react';

interface OwnProps {
  id: string;
  content: string;
  isChecked: boolean;
  isEditMode: boolean;
  onCheck: (isChecked: boolean) => void;
  onUpdateContent: (newContent: string) => void;
}

interface GiftState {
  id: string;
  content: string;
  isChecked: boolean;
  isEditMode: boolean;
}

export class EditableCheckbox extends React.Component<OwnProps, GiftState> {
  
  readonly state: GiftState;

  constructor(props: OwnProps) {
    super(props);
    this.state = { 
      id: this.props.id,
      content: this.props.content,
      isChecked: this.props.isChecked,
      isEditMode: this.props.isEditMode
     };
  }

  public componentDidUpdate(prevProps: GiftButtonsProps, state: GiftButtonsState): void {
    if (this.props.isEditMode !== prevProps.isEditMode) {
      this.setState({ isEditMode: this.props.isEditMode });
    }
  }

  private check(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ ...this.state, isChecked: event.target.checked });
    this.props.onCheck(event.target.checked);
  }

  private updateContent(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ ...this.state, content: event.target.value });
    this.props.onUpdateContent(event.target.value);
  }

  render(): JSX.Element {
    return (
        <div className="form-group form-check">
          <input type="checkbox"
            className="form-check-input"
            id={'check-gift-' + this.state.id}
            checked={this.state.isChecked}
            value={this.state.id}
            onChange={this.check.bind(this)} />
            {this.state.isEditMode ? (
              <input className="form-control"
                id={this.state.id}
                value={this.state.content}
                onChange={this.updateContent.bind(this)} />
            ) : (
              <label className="form-check-label" htmlFor={'check-gift-' + this.state.id}>
                {this.state.content}
              </label>
            )}
        </div>
    );
  }
}