import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

const styles = {
	deleteButton: {
		color: '#FDEDEC',
		'&:hover': {
			color: '#DF3030'
		}
	}
}

const DeleteButton = ({ classes, onDelete }) => (
  <span onClick={onDelete} className={classes.deleteButton}>
    <i className="fas fa-times-circle" />
	</span>
)

DeleteButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default injectSheet(styles)(DeleteButton)