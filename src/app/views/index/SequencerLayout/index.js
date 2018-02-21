import styles       from './index.scss'
import cx           from 'classnames'
import { Observer } from 'mobx-react'
import PropTypes    from 'prop-types'
import React        from 'react'

import Channel      from 'components/Channel'
import Clip         from 'components/Clip'
import Grid         from 'components/Layouts/Grid'

import TrackHeader  from './TrackHeader'

export default class SequencerLayout extends React.Component {
  static propTypes = {
    sequencer: PropTypes.object.isRequired,
  }

  renderHeaderCell = (col, row, track) => {
    return (
      <TrackHeader
        key={row}
        style={{ width: 130, height: 50 }}
        label={track.label}
        rgb={track.colorRGB}
      />
    )
  }

  renderClipCell = (col, row, track) => {
    const clip = track.clips.get(row)

    return (
      <Clip
        className={styles.clip}
        key={row}
        style={{ width: 130, height: 30 }}
        clip={clip}
        rgb={track.colorRGB}
        onDoubleClick={!clip ? () => track.insertClip(row) : undefined}
      />
    )
  }

  renderChannelCell = (col, row, track) => {
    return (
      <Channel
        style={{ width: 130, height: 280 }}
        key={row}
        channel={track.channel}
        label={col + 1}
        toggleMute={track.channel.toggleMute}
      />
    )
  }

  render() {
    const { sequencer, ...rest } = this.props

    return (
      <div {...rest} className={cx(styles.sequencerLayout, rest.className)}>
        {/* tracks */}
        <Grid
          rows={1}
          className={styles.trackHeader}
          columns={sequencer.tracks.length}
          columnClassName={styles.column}
          renderCell={(col, row) =>
            this.renderHeaderCell(col, row, sequencer.tracks[col])
          }
        />
        <Grid
          rows={10}
          className={styles.trackClips}
          columnClassName={styles.column}
          columns={sequencer.tracks.length}
          renderCell={(col, row) => (
            <Observer key={row}>
              {() => this.renderClipCell(col, row, sequencer.tracks[col])}
            </Observer>
          )}
        />
        <Grid
          rows={1}
          className={styles.trackChannel}
          columns={sequencer.tracks.length}
          columnClassName={styles.column}
          renderCell={(col, row) =>
            this.renderChannelCell(col, row, sequencer.tracks[col])
          }
        />
        {/* sends */}
        <Grid
          rows={1}
          className={styles.sendHeader}
          columns={sequencer.sends.length}
          columnClassName={styles.column}
          renderCell={(col, row) =>
            this.renderHeaderCell(col, row, sequencer.sends[col])
          }
        />
        <Grid
          className={styles.sendClips}
          rows={10}
          columnClassName={styles.column}
          columns={sequencer.sends.length}
          renderCell={(col, row) => {
            return this.renderClipCell(col, row, sequencer.sends[col])
          }}
        />
        <Grid
          className={styles.sendChannel}
          rows={1}
          columns={sequencer.sends.length}
          columnClassName={styles.column}
          renderCell={(col, row) => {
            return this.renderChannelCell(col, row, sequencer.sends[col])
          }}
        />
        {/* master */}
        <Grid
          className={styles.masterHeader}
          rows={1}
          columns={1}
          columnClassName={styles.column}
          renderCell={(col, row) => {
            return this.renderHeaderCell(col, row, sequencer.master)
          }}
        />
        <Grid
          className={styles.masterClips}
          rows={10}
          columns={1}
          columnClassName={styles.column}
          renderCell={(col, row) => {
            return this.renderClipCell(col, row, sequencer.master)
          }}
        />
        <Grid
          className={styles.masterChannel}
          rows={1}
          columns={1}
          columnClassName={styles.column}
          renderCell={(col, row) => {
            return this.renderChannelCell(col, row, sequencer.master)
          }}
        />
      </div>
    )
  }
}
