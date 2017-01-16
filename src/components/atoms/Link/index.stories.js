import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Link from '.'

storiesOf('Link', module)
    .add('default', () => (
        <Link href="https://github.com/diegohaz/arc">Influx</Link>
    ))
    .add('reverse', () => (
        <Link href="https://github.com/diegohaz/arc" reverse>Influx</Link>
    ))
    .add('another color', () => (
        <Link href="https://github.com/diegohaz/arc" color="secondary">Influx</Link>
    ))