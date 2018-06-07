import * as React from 'react';
import { Child } from '../model/Child';
import ChildComponent from './Child';
import * as actions from '../state/actions';
import { AppState } from '../model/AppState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface ChildrenListStateProps {
  children: Child[];
}

interface ChildrenListDispatchProps {
  onNewChild: () => void;
}

type ChildrenListProps = ChildrenListDispatchProps & ChildrenListStateProps;

export const ChildrenListComponent: React.SFC<ChildrenListProps> =
  ({ children, onNewChild }: ChildrenListProps): JSX.Element => (
    <div className="container">
      {children.map((child: Child) => <ChildComponent key={child.id} child={child} />)}
    </div>
);

const mapStateToProps = ({ children }: AppState): ChildrenListStateProps => ({
  children
});

const mapDispatchToProps = (dispatch: Dispatch<actions.Action>): ChildrenListDispatchProps => ({
  onNewChild: (): actions.NewChild => dispatch(actions.newChild()),
});

export default connect<ChildrenListStateProps, ChildrenListDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ChildrenListComponent);