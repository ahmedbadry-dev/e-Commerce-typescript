import { Row, Col } from "react-bootstrap"

type TGridListProps<T> = {
    records: T[],
    renderRecord: (record: T) => React.ReactNode
}



const GridList = <T extends { id: number }>({ records, renderRecord }: TGridListProps<T>) => {

    const List = records.length > 0 && records.map(record => (
        <Col xs={6} md={3} key={record.id} className="d-flex justify-content-center mb-5 mt-2">
            {renderRecord(record)}
        </Col>

    ))

    return (
        <Row>
            {List}
        </Row>
    )
}

export default GridList