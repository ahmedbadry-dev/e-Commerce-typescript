import { memo } from "react"

const Heading = memo(({ title }: { title: string }) => {
    console.log('fire');

    return (
        <h2
            className="mb-3"
            style={{ fontSize: '24px' }}
        >{title}</h2>
    )
})

export default Heading