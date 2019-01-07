import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

const styles = {
  deleteButton: {
    color: '#FDEDEC',
    '&:hover': {
      color: '#E74C3C'
    }
  }
}

const DeleteButton = ({ classes, onDelete }) => (
  <span onClick={onDelete} className={classes.deleteButton}>
    <i class="fas fa-times-circle"></i>
	</span>
)

DeleteButton.propTypes = {
  classes: PropTypes.object.isRequired,
  // onDelete: PropTypes.func.isRequired
}

export default injectSheet(styles)(DeleteButton)