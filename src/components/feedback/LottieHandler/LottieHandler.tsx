import Lottie from "lottie-react";
import notFound from '@assets/lottieFiles/notFound.json'
import empty from '@assets/lottieFiles/empty.json'
import loading from '@assets/lottieFiles/loading.json'
import layoutLoading from '@assets/lottieFiles/layoutLoading.json'
import error from '@assets/lottieFiles/error.json'


const lottieFilesMap = {
    notFound,
    empty,
    loading,
    layoutLoading,
    error
}

type TLottieHandlerProps = {
    type: keyof typeof lottieFilesMap,
    message?: string
}

const LottieHandler = ({ type, message }: TLottieHandlerProps) => {

    const lottie = lottieFilesMap[type]
    const messageStyle = type === 'error'
        ? { fontSize: '19px', color: 'red' }
        : { marginTop: '30px', fontSize: '19px' }
    const layoutStyle = type === 'layoutLoading'
        ? { width: '500px' }
        : { width: '400px' }
    return (
        <div className="d-flex flex-column align-items-center justify-content-center" >
            <Lottie animationData={lottie} style={layoutStyle} />
            {message && <h3 style={messageStyle}>{message}</h3>}
        </div>
    )
}

export default LottieHandler
