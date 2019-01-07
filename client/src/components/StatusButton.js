import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

const styles = {
	statusButton: {
		color: '#EBF5FB',
		'&:hover': {
			color: '#3498DB'
		}
	}
}

const StatusButton = ({ classes, onStatus }) => (
	<span onClick={onStatus} className={classes.statusButton}>
		<i class="fas fa-chevron-circle-down" />
	</span>
)

StatusButton.propTypes = {
	classes: PropTypes.object.isRequired
	// onDelete: PropTypes.func.isRequired
}

export default injectSheet(styles)(StatusButton)