import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    // const { email } = this.props;

    return (
      // <Header email={ email } />
      <span>Jéssica</span>
    );
  }
}

// const mapStateToProps = (state) => ({
//   email: state.user.email,
// });

// Wallet.propTypes = {
//   email: PropTypes.string.isRequired,
// };

export default connect()(Wallet);
