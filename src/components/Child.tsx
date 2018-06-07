import * as React from 'react';
import { Child } from '../model/Child';
import { EditableLabelComponent } from './Child/EditableLabel';
import { ButtonsComponent } from './Child/Buttons';
import GiftListComponent from './GiftList';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../state/actions';

export interface ChildDispatchProps {
  onDeleteChild: (child: Child) => actions.DeleteChild;
  onSaveChild: (child: Child) => actions.SaveChild;
}

export interface ChildOwnProps {
  child: Child;
}

export interface ChildState {
  id: string;
  name: string;
  description: string;
  isEditMode: boolean;
  isNewlyCreated: boolean;
}

type ChildProps = ChildDispatchProps & ChildOwnProps;

class ChildComponent extends React.Component<ChildProps, ChildState> {
  
  readonly state: ChildState;

  constructor(props: ChildProps) {
    super(props);
    this.state = { ...props.child };
  }

  private deleteChild(): void {
    this.props.onDeleteChild(this.props.child);
  }

  private editMode(): void {
    this.setState({ ...this.state, isEditMode: true });
  }

  private cancelEdit(): void {
    this.setState({ ...this.props.child, isEditMode: false });
  }

  private saveChild(): void {
    this.setState({ ...this.state, isEditMode: false, isNewlyCreated: false });
    this.props.onSaveChild({
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      isEditMode: false,
      isNewlyCreated: false
    });
  }

  private handleChangeChildName(newName: string): void {
    this.setState({ ...this.state, name: newName });
  }

  private handleChangeChildDescription(newDescription: string): void  {
    this.setState({ ...this.state, description: newDescription });
  }

  render(): JSX.Element {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <EditableLabelComponent
                id={'input-child-name-' + this.state.id}
                label="Imię i nazwisko"
                value={this.state.name}
                editMode={this.state.isEditMode}
                onUpdate={this.handleChangeChildName.bind(this)} />
              <EditableLabelComponent
                id={'input-child-desc-' + this.state.id}
                label="Opis"
                value={this.state.description}
                editMode={this.state.isEditMode}
                onUpdate={this.handleChangeChildDescription.bind(this)} />
              <ButtonsComponent
                isEditMode={this.state.isEditMode}
                isNewlyCreated={this.state.isNewlyCreated}
                onCancel={this.cancelEdit.bind(this)}
                onEdit={this.editMode.bind(this)}
                onSave={this.saveChild.bind(this)}
                onDelete={this.deleteChild.bind(this)} />
              <GiftListComponent childId={this.state.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<actions.Action>): ChildDispatchProps => ({
  onDeleteChild: (child: Child): actions.DeleteChild => dispatch(actions.deleteChild(child)),
  onSaveChild: (child: Child): actions.SaveChild => dispatch(actions.saveChild(child)),
});

export default connect<{}, ChildDispatchProps>(null, mapDispatchToProps)(ChildComponent);