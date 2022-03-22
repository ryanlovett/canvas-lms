/*
 * Copyright (C) 2018 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'
import {object} from 'prop-types'
import { useScope as useI18nScope } from '@canvas/i18n';
import _ from 'lodash'
import {ApplyTheme} from '@instructure/ui-themeable'
import {View} from '@instructure/ui-view'
import {Button} from '@instructure/ui-buttons'
import {IconAssignmentLine, IconQuizLine} from '@instructure/ui-icons'

import {Link} from '@instructure/ui-link'

const I18n = useI18nScope('IndividualStudentMasteryUnassessedAssignment');

const UnassessedAssignment = ({assignment}) => {
  const {id, url, submission_types, title} = assignment
  return (
    <View padding="small" display="block" key={id}>
      <ApplyTheme theme={{[Button.theme]: {linkColor: '#68777D', fontWeight: '700'}}}>
        <Link
          href={url}
          isWithinText={false}
          theme={{mediumPaddingHorizontal: '0', mediumHeight: 'normal'}}
          renderIcon={
            _.includes(submission_types, 'online_quiz') ? IconQuizLine : IconAssignmentLine
          }
        >
          {title} ({I18n.t('Not yet assessed')})
        </Link>
      </ApplyTheme>
    </View>
  )
}

UnassessedAssignment.propTypes = {
  assignment: object.isRequired
}

export default UnassessedAssignment
