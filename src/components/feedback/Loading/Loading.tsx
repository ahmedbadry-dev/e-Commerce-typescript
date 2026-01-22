import type { TLoading } from "@types"

type TLoadingProps = {
    status: TLoading,
    error: null | string,
    children: React.ReactNode
}
const Loading = ({ status, children, error }: TLoadingProps) => {

    if (status === 'pending') {
        return <p>Loading please wait</p>
    }

    if (status === 'failed') {
        return <p>{error}</p>
    }
    return (
        <>
            {children}
        </>
    )
}

export default Loading
