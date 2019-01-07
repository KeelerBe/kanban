import React from 'react'
import PropTypes from 'prop-types'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faTimesCircle, faChevronCircleDown)

const Task = ({ task }) => (
	<div id="task">
		<div>
			<span>
				<FontAwesomeIcon icon="times-circle" color="#FDEDEC" />
			</span>
			<span>
        <FontAwesomeIcon icon="chevron-circle-down" color="#EBF5FB" />
			</span>
		</div>
		<div>
			<p>{task}</p>
		</div>
	</div>
)

Task.propTypes = {
	task: PropTypes.string.isRequired
}

export default Task