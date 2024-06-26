import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FeaturedTags from 'mastodon/features/account/containers/featured_tags_container';

const mapStateToProps = (state, { match: { params: { acct } } }) => {
  const accountId = state.getIn(['accounts_map', acct]);

  if (!accountId) {
    return {
      isLoading: true,
    };
  }

  return {
    accountId,
    isLoading: false,
  };
};

export default @connect(mapStateToProps)
class AccountNavigation extends React.PureComponent {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        acct: PropTypes.string,
        tagged: PropTypes.string,
      }).isRequired,
    }).isRequired,

    accountId: PropTypes.string,
    isLoading: PropTypes.bool,
  };

  render () {
    const { accountId, isLoading, match: { params: { tagged } } } = this.props;

    if (isLoading) {
      return null;
    }

    return (
      <>
        <div className='flex-spacer' />
        <FeaturedTags accountId={accountId} tagged={tagged} />
      </>
    );
  }

}
