import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

// components
import PageTitle from '../../components/PageTitle';
import UserBox from '../../profile/UserBox';

import SellerBox from '../../profile/SellerBox';
import Messages from '../../components/Messages';

const DatosPersonales = (): React$Element<React$FragmentType> => {
    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[{ label: 'Datos Personales', path: './DatosPersonales', active: true }]}
                title={'Datos Personales'}
            />
            <Row>
                <Col sm={12}>
                    {/* User information */}
                    <UserBox />
                </Col>
            </Row>

            <Row>
                <Col xl={4}>
                    {/* User's seller information */}
                    <SellerBox />

                    {/* Contact information */}
                    <Card className="text-white bg-info overflow-hidden">
                        <Card.Body>
                            <div className="toll-free-box text-center">
                                <h4>
                                    {' '}
                                    <i className="mdi mdi-deskphone"></i> Toll Free : 1-234-567-8901
                                </h4>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* User's recent messages */}
                    <Messages />
                </Col>

                <Col xl={8}>
                    {/* User's performance */}

                    {/* Some statistics */}

                    {/* Products */}
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default DatosPersonales;
