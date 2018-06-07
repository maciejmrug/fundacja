import * as React from 'react';
import { Gift } from '../model/Gift';
import GiftComponent from './Gift/Gift';
import { AppState } from '../model/AppState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import * as actions from '../state/actions';

interface StateProps {
  gifts: Gift[];
}

interface DispatchProps {
  onNewGift: (childId: string) => void;
}

interface OwnProps {
  childId: string;
}

type GiftListProps = StateProps & DispatchProps & OwnProps;

const GiftListComponent: React.SFC<GiftListProps> =
  ({ gifts, childId, onNewGift }: GiftListProps): JSX.Element => (
    <div>
      {gifts.map((gift: Gift) => <GiftComponent key={gift.id} gift={gift} />)}
      <div className="row">
        <Button variant="outlined" size="small" onClick={() => onNewGift(childId)}>
          <AddIcon />&nbsp;Dodaj prezent
        </Button>
      </div>
    </div>
);

const mapStateToProps = ({ gifts }: AppState, { childId }: OwnProps): StateProps => ({
  gifts: gifts.filter((gift: Gift) => gift.childId === childId)
});

const mapDispatchToProps = (dispatch: Dispatch<actions.Action>): DispatchProps => ({
  onNewGift: (childId: string): actions.NewGift => dispatch(actions.newGift(childId))
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(GiftListComponent);