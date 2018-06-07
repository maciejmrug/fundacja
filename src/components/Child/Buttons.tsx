import * as React from 'react';

export interface ButtonsState {
  editMode: boolean;
  isNewlyCreated: boolean;
}

export interface ButtonsProps {
  isEditMode: boolean;
  isNewlyCreated: boolean;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

export class ButtonsComponent extends React.Component<ButtonsProps, ButtonsState> {

  readonly state: ButtonsState;

  constructor(props: ButtonsProps) {
    super(props);
    this.state = this.getStateFromProps();
  }

  private getStateFromProps(): ButtonsState {
    return {editMode: this.props.isEditMode, isNewlyCreated: this.props.isNewlyCreated};
  }

  public componentDidUpdate(prevProps: ButtonsProps, state: ButtonsState): void {
    if (this.props.isEditMode !== prevProps.isEditMode) {
      this.setState(this.getStateFromProps());
    }
  }

  render() {
    return (
      <div>
        {this.state.editMode ? (
          <div>
            {this.state.isNewlyCreated ||
              <button className="btn btn-outline-warning btn-sm"
                onClick={(event: React.MouseEvent<HTMLButtonElement>): void => this.props.onCancel()}>
                Anuluj
              </button>
            }
            <button className="btn btn-outline-success btn-sm"
              onClick={(event: React.MouseEvent<HTMLButtonElement>): void => this.props.onSave()}>
              Zapisz
            </button>
            <button className="btn btn-outline-danger btn-sm"
              onClick={(event: React.MouseEvent<HTMLButtonElement>): void => this.props.onDelete()}>
              Usuń
            </button>
          </div>
        ) : (
          <div>
            <button className="btn btn-outline-dark btn-sm"
              onClick={(event: React.MouseEvent<HTMLButtonElement>): void => this.props.onEdit()}>
              Edytuj
            </button>
            <button className="btn btn-outline-danger btn-sm"
              onClick={(event: React.MouseEvent<HTMLButtonElement>): void => this.props.onDelete()}>
              Usuń
            </button>
          </div>
        )}
      </div>
    );
  }
}