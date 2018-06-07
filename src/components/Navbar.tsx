import * as React from 'react';
import * as actions from '../state/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface NavbarDispatchProps {
  onNewChild: () => void;
}

type ChildrenListProps = NavbarDispatchProps;

export const NavbarComponent: React.SFC<ChildrenListProps> =
  ({ onNewChild }: ChildrenListProps): JSX.Element => (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light container">
      <button className="btn btn-outline-success my-2 my-sm-0"
        onClick={(event: React.MouseEvent<HTMLButtonElement>): void => onNewChild()}>
        Dodaj dziecko
      </button>
    </nav>
);

const mapDispatchToProps = (dispatch: Dispatch<actions.Action>): NavbarDispatchProps => ({
  onNewChild: (): actions.NewChild => dispatch(actions.newChild()),
});

export default connect<null, NavbarDispatchProps>(
  null,
  mapDispatchToProps
)(NavbarComponent);