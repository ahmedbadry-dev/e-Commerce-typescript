import { Row, Col } from "react-bootstrap"
import { LottieHandler } from "@components/feedback"
type TGridListProps<T> = {
    records: T[],
    renderRecord: (record: T) => React.ReactNode,
    emptyMessage: string
}



const GridList = <T extends { id: number }>({ records, renderRecord, emptyMessage }: TGridListProps<T>) => {

    const List = records.length > 0 ? records.map(record => (
        <Col xs={6} md={3} key={record.id} className="d-flex justify-content-center mb-5 mt-2">
            {renderRecord(record)}
        </Col>

    ))
        : <LottieHandler type="empty" message={emptyMessage} />

    return (
        <Row>
            {List}
        </Row>
    )
}

export default GridList