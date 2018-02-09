import { withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf }       from '@storybook/react'
import { times }           from 'lodash'
import React               from 'react'

import ScrollSync          from './ScrollSync'
import VerticalList        from './VerticalList'
import ScrollSyncManager   from './index.js'

storiesOf('ScrollSync', module)
  .addDecorator(withKnobs)
  .add('vertical list', () => {
    return (
      <VerticalList
        data={times(100, i => i)}
        renderRow={i => <div style={{ height: 100 }}>{i}</div>}
      />
    )
  })
  .add('default', () => {
    return (
      <aside
        style={{
          display: 'flex',
          flexDirection: 'column',
          WebkitOverflowScrolling: 'touch',
          willChange: 'transform',
          boxSizing: 'border-box',
          overflow: 'auto',
        }}
      >
        {times(20, i => (
          <div key={i} style={{ display: 'flex', flexShrink: '0' }}>
            {times(20, j => (
              <div
                key={`${i}${j}`}
                style={{
                  width: '10em',
                  height: '10em',
                  flexShrink: '0',
                }}
              >{`${i} ${j}`}</div>
            ))}
          </div>
        ))}
      </aside>
      // <ScrollSyncManager
      //   render={({ onScroll, scrollTopPercent, scrollLeftPercent }) => {
      //     return (
      //       <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
      //         <ScrollSync
      //           onScroll={onScroll}
      //           scrollTopPercent={scrollTopPercent}
      //           scrollLeftPercent={scrollLeftPercent}
      //         >
      //           <aside style={{ display: 'flex', flexDirection: 'column' }}>
      //             {times(20, i => (
      //               <div key={i} style={{ display: 'flex', flexShrink: '0' }}>
      //                 {times(20, j => (
      //                   <div
      //                     key={`${i}${j}`}
      //                     style={{
      //                       width: '10em',
      //                       height: '10em',
      //                       flexShrink: '0',
      //                     }}
      //                   >{`${i} ${j}`}</div>
      //                 ))}
      //               </div>
      //             ))}
      //           </aside>
      //         </ScrollSync>
      //         <ScrollSync
      //           scrollTopPercent={scrollTopPercent}
      //           scrollLeftPercent={scrollLeftPercent}
      //         >
      //           <div style={{ display: 'flex', flexDirection: 'column' }}>
      //             {times(20, i => (
      //               <div key={i} style={{ display: 'flex', flexShrink: '0' }}>
      //                 {times(20, j => (
      //                   <div
      //                     key={`${i}${j}`}
      //                     style={{
      //                       width: '10em',
      //                       height: '10em',
      //                       flexShrink: '0',
      //                     }}
      //                   >{`${i} ${j}`}</div>
      //                 ))}
      //               </div>
      //             ))}
      //           </div>
      //         </ScrollSync>
      //       </div>
      //     )
      //   }}
      // />
    )
  })
