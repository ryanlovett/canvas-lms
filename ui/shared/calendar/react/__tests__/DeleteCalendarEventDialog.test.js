/*
 * Copyright (C) 2022 - present Instructure, Inc.
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
import fetchMock from 'fetch-mock'
import {render, act} from '@testing-library/react'
import {getByText} from '@testing-library/dom'

import {
  DeleteCalendarEventDialog,
  renderDeleteCalendarEventDialog
} from '../DeleteCalendarEventDialog'

const handleCancel = jest.fn()
const handleDeleting = jest.fn()
const handleDeleted = jest.fn()

const defaultProps = {
  isOpen: true,
  onCancel: handleCancel,
  onDeleting: handleDeleting,
  onDeleted: handleDeleted,
  delUrl: '.',
  isRepeating: true
}

function renderDialog(overrideProps = {}) {
  const props = {...defaultProps, ...overrideProps}
  return render(<DeleteCalendarEventDialog {...props} />)
}

describe('DeleteCalendarEventDialog', () => {
  beforeEach(() => {
    fetchMock.delete('.', ['deleted event'])
  })

  afterEach(() => {
    jest.resetAllMocks()
    fetchMock.restore()
  })

  it('renders single event dialog', () => {
    const {getByText} = renderDialog({isRepeating: false})
    expect(getByText('Confirm Deletion')).toBeInTheDocument()
    expect(getByText('Are you sure you want to delete this event?')).toBeInTheDocument()
  })

  it('renders event series dialog', () => {
    const {getByText} = renderDialog()
    expect(getByText('Confirm Deletion')).toBeInTheDocument()
    expect(getByText('This event')).toBeInTheDocument()
    expect(getByText('All events')).toBeInTheDocument()
    expect(getByText('This and all following events')).toBeInTheDocument()
  })

  it('closes on cancel', () => {
    const {getByText} = renderDialog()
    act(() => getByText('Cancel').closest('button').click())
    expect(handleCancel).toHaveBeenCalled()
  })

  it('calls callbacks when deleting', async () => {
    const {getByText} = renderDialog()
    act(() => getByText('Delete').closest('button').click())
    expect(handleDeleting).toHaveBeenCalled()
    await fetchMock.flush(true)
    expect(handleDeleted).toHaveBeenCalledWith(['deleted event'])
  })

  it('sends which=one when "this event" is seleted', async () => {
    const {getByText} = renderDialog()
    getByText('This event').click()
    act(() => getByText('Delete').closest('button').click())
    await fetchMock.flush(true)
    const which = JSON.parse(fetchMock.lastCall()[1].body).which
    expect(which).toEqual('one')
  })

  it('sends which=following when "this and all following" is seleted', async () => {
    const {getByText} = renderDialog()
    getByText('This and all following events').click()
    act(() => getByText('Delete').closest('button').click())
    await fetchMock.flush(true)
    const which = JSON.parse(fetchMock.lastCall()[1].body).which
    expect(which).toEqual('following')
  })

  it('sends which=all when "all events" is seleted', async () => {
    const {getByText} = renderDialog()
    getByText('All events').click()
    act(() => getByText('Delete').closest('button').click())
    await fetchMock.flush(true)
    const which = JSON.parse(fetchMock.lastCall()[1].body).which
    expect(which).toEqual('all')
  })

  describe('render function', () => {
    it('renders', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)
      renderDeleteCalendarEventDialog(container, defaultProps)
      expect(getByText(document.body, 'Confirm Deletion')).toBeInTheDocument()
    })
  })
})
