import React from 'react'

type Props = {
    name: string;
}

const DashboardPage = (props: Props) => {
    return (
        <div>DashboardPage {props.name}</div>
    )
}

export default DashboardPage