import { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";

const Ordercard = (props) => {
    const {pack} = props
    return (
            <Col className="temp" key={1} xs={12} md={4} lg={3} >
                <Card>
                    <Card.Img src="https://via.placeholder.com/150x75" />

                    <Card.Body>
                        <Card.Title>{pack.name}</Card.Title>
                        <Card.Text>dfjaolenfd aoiejfn aofjoeanfd vxlajneofn </Card.Text>
                        <Card.Title>{pack.cost} Only</Card.Title>
                    </Card.Body>
                </Card>
            </Col>);
}
export default Ordercard