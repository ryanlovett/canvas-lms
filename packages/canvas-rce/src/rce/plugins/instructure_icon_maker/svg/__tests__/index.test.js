/* eslint-disable jest/no-large-snapshots */
/*
 * Copyright (C) 2021 - present Instructure, Inc.
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

import {buildGroup, buildSvg, buildSvgWrapper, buildStylesheet} from '../index'
import {DEFAULT_SETTINGS} from '../constants'

let settings, options

describe('buildSvg()', () => {
  beforeEach(() => {
    settings = {
      ...DEFAULT_SETTINGS,
      shape: 'circle',
      size: 'large',
      color: '#000',
      outlineColor: '#fff',
      outlineSize: 'large'
    }
    options = {}
  })

  it('builds the icon svg', () => {
    expect(buildSvg(settings)).toMatchInlineSnapshot(`
      <svg
        fill="none"
        height="244px"
        viewBox="0 0 218 244"
        width="218px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <metadata>
          {"type":"image/svg+xml-icon-maker-icons","shape":"circle","size":"large","color":"#000","outlineColor":"#fff","outlineSize":"large","text":"","textSize":"small","textColor":"#000000","textBackgroundColor":null,"textPosition":"below","encodedImage":"","encodedImageType":"","encodedImageName":"","x":0,"y":0,"translateX":0,"translateY":0,"width":0,"height":0,"transform":"","imageSettings":null}
        </metadata>
        <svg
          fill="none"
          height="218px"
          viewBox="0 0 218 218"
          width="218px"
          x="0"
        >
          <g
            fill="#000"
            stroke="#fff"
            stroke-width="8"
          >
            <clippath
              id="clip-path-for-embed"
            >
              <circle
                cx="109"
                cy="109"
                r="105"
              />
            </clippath>
            <circle
              cx="109"
              cy="109"
              r="105"
            />
          </g>
        </svg>
      </svg>
    `)
  })

  it('builds the icon svg when is preview mode', () => {
    settings = {...settings, color: null}
    options = {...options, isPreview: true}
    expect(buildSvg(settings, options)).toMatchInlineSnapshot(`
      <svg
        fill="none"
        height="244px"
        style="padding: 16px"
        viewBox="0 0 218 244"
        width="218px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <svg
          fill="none"
          height="218px"
          viewBox="0 0 218 218"
          width="218px"
          x="0"
        >
          <g
            fill="none"
            stroke="#fff"
            stroke-width="8"
          >
            <clippath
              id="clip-path-for-embed"
            >
              <circle
                cx="109"
                cy="109"
                r="105"
              />
            </clippath>
            <circle
              cx="109"
              cy="109"
              r="105"
            />
          </g>
        </svg>
      </svg>
    `)
  })

  it('builds the icon svg with text', () => {
    settings = {...settings, text: 'Hello World!'}
    expect(buildSvg(settings)).toMatchInlineSnapshot(`
      <svg
        fill="none"
        height="258px"
        viewBox="0 0 218 258"
        width="218px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <metadata>
          {"type":"image/svg+xml-icon-maker-icons","shape":"circle","size":"large","color":"#000","outlineColor":"#fff","outlineSize":"large","text":"Hello World!","textSize":"small","textColor":"#000000","textBackgroundColor":null,"textPosition":"below","encodedImage":"","encodedImageType":"","encodedImageName":"","x":0,"y":0,"translateX":0,"translateY":0,"width":0,"height":0,"transform":"","imageSettings":null}
        </metadata>
        <svg
          fill="none"
          height="218px"
          viewBox="0 0 218 218"
          width="218px"
          x="0"
        >
          <g
            fill="#000"
            stroke="#fff"
            stroke-width="8"
          >
            <clippath
              id="clip-path-for-embed"
            >
              <circle
                cx="109"
                cy="109"
                r="105"
              />
            </clippath>
            <circle
              cx="109"
              cy="109"
              r="105"
            />
          </g>
        </svg>
        <path
          d="M103,224 h14 a4,4 0 0 1 4,4 v16 a4,4 0 0 1 -4,4 h-14 a4,4 0 0 1 -4,-4 v-16 a4,4 0 0 1 4,-4 z"
          fill=""
        />
        <text
          fill="#000000"
          font-family="Lato Extended"
          font-size="14"
          font-weight="bold"
          x="103"
          y="240"
        >
          <tspan
            dy="0"
            x="103"
          >
            Hello World!
          </tspan>
        </text>
      </svg>
    `)
  })
})

describe('buildSvgWrapper()', () => {
  beforeEach(() => {
    settings = {...DEFAULT_SETTINGS}
  })

  it('builds the <svg /> wrapper when size is x-small', () => {
    expect(buildSvgWrapper({...settings, size: 'x-small'})).toMatchInlineSnapshot(`
      <svg
        fill="none"
        height="74px"
        viewBox="0 0 74 74"
        width="74px"
        x="0"
      />
    `)
  })

  it('builds the <svg /> wrapper when size is small', () => {
    expect(buildSvgWrapper({...settings, size: 'small'})).toMatchInlineSnapshot(`
      <svg
        fill="none"
        height="122px"
        viewBox="0 0 122 122"
        width="122px"
        x="0"
      />
    `)
  })

  it('builds the <svg /> wrapper when size is medium', () => {
    expect(buildSvgWrapper({...settings, size: 'medium'})).toMatchInlineSnapshot(`
      <svg
        fill="none"
        height="158px"
        viewBox="0 0 158 158"
        width="158px"
        x="0"
      />
    `)
  })

  it('builds the <svg /> wrapper when size is large', () => {
    expect(buildSvgWrapper({...settings, size: 'large'})).toMatchInlineSnapshot(`
      <svg
        fill="none"
        height="218px"
        viewBox="0 0 218 218"
        width="218px"
        x="0"
      />
    `)
  })
})

describe('buildGroup()', () => {
  beforeEach(() => {
    settings = {...DEFAULT_SETTINGS, color: '#f00', outlineColor: '#0f0', outlineSize: 'small'}
  })

  it('builds the <g /> element when color is set', () => {
    expect(buildGroup(settings)).toMatchInlineSnapshot(`
      <g
        fill="#f00"
        stroke="#0f0"
        stroke-width="2"
      />
    `)
  })

  it('builds the <g /> element when color is not set', () => {
    settings = {...settings, color: null}
    expect(buildGroup(settings)).toMatchInlineSnapshot(`
      <g
        fill="none"
        stroke="#0f0"
        stroke-width="2"
      />
    `)
  })

  it('builds the <g /> element when color is not set and is preview mode', () => {
    settings = {...settings, color: null}
    options = {...options, isPreview: true}
    expect(buildGroup(settings, options)).toMatchInlineSnapshot(`
      <g
        fill="none"
        stroke="#0f0"
        stroke-width="2"
      />
    `)
  })

  it('builds the <g /> element when outlineColor is not set', () => {
    settings = {...settings, outlineColor: null}
    expect(buildGroup(settings)).toMatchInlineSnapshot(`
      <g
        fill="#f00"
      />
    `)
  })

  describe('when outlineSize is set', () => {
    it('builds the <g /> element when outlineSize is "none"', () => {
      settings = {...settings, outlineSize: 'none'}
      expect(buildGroup(settings)).toMatchInlineSnapshot(`
        <g
          fill="#f00"
          stroke="#0f0"
          stroke-width="0"
        />
      `)
    })

    it('builds the <g /> element when outlineSize is "small"', () => {
      settings = {...settings, outlineSize: 'small'}
      expect(buildGroup(settings)).toMatchInlineSnapshot(`
        <g
          fill="#f00"
          stroke="#0f0"
          stroke-width="2"
        />
      `)
    })

    it('builds the <g /> element when outlineSize is "medium"', () => {
      settings = {...settings, outlineSize: 'medium'}
      expect(buildGroup(settings)).toMatchInlineSnapshot(`
        <g
          fill="#f00"
          stroke="#0f0"
          stroke-width="4"
        />
      `)
    })

    it('builds the <g /> element when outlineSize is "large"', () => {
      settings = {...settings, outlineSize: 'large'}
      expect(buildGroup(settings)).toMatchInlineSnapshot(`
        <g
          fill="#f00"
          stroke="#0f0"
          stroke-width="8"
        />
      `)
    })
  })
})

describe('buildStylesheet()', () => {
  it('builds the <style /> element', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        blob: () => Promise.resolve(new Blob())
      })
    )

    expect(await buildStylesheet()).toMatchInlineSnapshot(`
      <style
        type="text/css"
      >
        @font-face {font-family: "Lato Extended";font-weight: bold;src: url(data:;base64,);}
      </style>
    `)
  })
})
