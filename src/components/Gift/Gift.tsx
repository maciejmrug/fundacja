import * as React from 'react';
import { Gift } from '../../model/Gift';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../../state/actions';
import { EditableCheckbox } from './EditableCheckbox';
import { GiftButtons } from './GiftButtons';

interface DispatchProps {
  onCheckGift: (gift: Gift, isChecked: boolean) => void;
  onUpdateGift: (gift: Gift) => void;
  onDeleteGift: (gift: Gift) => void;
}

interface OwnProps {
  gift: Gift;
}

interface GiftState {
  gift: Gift;
}

type GiftProps = DispatchProps & OwnProps;

class GiftComponent extends React.Component<GiftProps, GiftState> {
  
  readonly state: GiftState;

  constructor(props: GiftProps) {
    super(props);
    this.state = { gift: { ...props.gift } };
  }

  private check(isChecked: boolean): void {
    this.setState({ gift: { ...this.state.gift, isChecked: isChecked } });
    this.props.onCheckGift(this.props.gift, isChecked);
  }

  private updateGiftName(newName: string): void {
    this.setState({ gift: { ...this.state.gift, name: newName } });
  }

  private edit(): void {
    this.setState({ gift: { ...this.state.gift, isEditMode: true } });
  }

  private save(): void {
    this.setState({ gift: { ...this.state.gift, isEditMode: false } });
    this.props.onUpdateGift(this.state.gift);
  }

  private cancel(): void {
    this.setState({ gift: { ...this.state.gift, isEditMode: false, name: this.props.gift.name } });
  }

  private delete(): void {
    this.props.onDeleteGift(this.props.gift);
  }

  render(): JSX.Element {
    return (
      <div className="row">
        <div className="col-9">
          <EditableCheckbox id={this.state.gift.id}
            content={this.state.gift.name}
            isChecked={this.state.gift.isChecked}
            isEditMode={this.state.gift.isEditMode}
            onUpdateContent={this.updateGiftName.bind(this)}
            onCheck={this.check.bind(this)}
          />
        </div>
        <div className="col-3">
          <GiftButtons isEditMode={this.state.gift.isEditMode}
            onEdit={this.edit.bind(this)}
            onDelete={this.delete.bind(this)}
            onCancel={this.cancel.bind(this)}
            onSave={this.save.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<actions.Action>) => ({
  onCheckGift: (gift: Gift, isChecked: boolean) => dispatch(actions.checkGift(gift, isChecked)),
  onUpdateGift: (gift: Gift) => dispatch(actions.updateGift(gift)),
  onDeleteGift: (gift: Gift) => dispatch(actions.deleteGift(gift)),
});

export default connect<{}, DispatchProps, OwnProps>(null, mapDispatchToProps)(GiftComponent);