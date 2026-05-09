import { Container, Row, Col } from "react-bootstrap";

function Header() {
    return (
        <header className="header">
            <Container fluid="lg">
                <Row>
                    <Col md="6">
                        <div className="title">Finlogger</div>
                    </Col>
                    <Col md="6">
                        <div className="tagline">Your financial diary!</div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}

export default Header;