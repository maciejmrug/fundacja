import * as React from 'react';

export interface GiftButtonsState {
  isEditMode: boolean;
}

export interface GiftButtonsProps {
  isEditMode: boolean;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

export class GiftButtons extends React.Component<GiftButtonsProps, GiftButtonsState> {

  readonly state: GiftButtonsState;

  constructor(props: GiftButtonsProps) {
    super(props);
    this.state = { isEditMode: this.props.isEditMode };
  }

  public componentDidUpdate(prevProps: GiftButtonsProps, state: GiftButtonsState): void {
    if (this.props.isEditMode !== prevProps.isEditMode) {
      this.setState({ isEditMode: this.props.isEditMode });
    }
  }

  render() {
    return (
      <div>
        {this.state.isEditMode ? (
          <div>
            <button className="btn btn-outline-dark btn-sm" onClick={this.props.onCancel}>
              Anuluj
            </button>
            <button className="btn btn-outline-success btn-sm" onClick={this.props.onSave}>
              Zapisz
            </button>
          </div>
        ) : (
          <div>
            <button className="btn btn-outline-dark btn-sm" onClick={this.props.onEdit}>
              Edytuj
            </button>
            <button className="btn btn-outline-danger btn-sm" onClick={this.props.onDelete}>
              Usuń
            </button>
          </div>
        )}
      </div>
    );
  }
}