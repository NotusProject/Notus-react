import * as Headless from '@headlessui/react'
import React from 'react'
import {Link as RouterLink, type LinkProps} from 'react-router-dom'

export const Link = React.forwardRef(function Link(
    props: { href: string | LinkProps['to'] } & Omit<LinkProps, 'to'>,
    ref: React.ForwardedRef<HTMLAnchorElement>
) {
    return (
        <Headless.DataInteractive>
            <RouterLink {...props} to={props.href} ref={ref}/>
        </Headless.DataInteractive>
    )
})
