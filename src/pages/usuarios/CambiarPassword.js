import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

// components
import PageTitle from '../../components/PageTitle';

const CambiarPassword = (): React$Element<React$FragmentType> => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[{ label: 'Cambiar Password', path: './CambiarPassword', active: true }]}
                title={'Cambiar Password'}
            />
            <Card>
                <Card.Body>
                    <h4 className="mb-3 header-title">Digite su correo</h4>

                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="exampleEmail2">Email</Form.Label>
                            <Form.Control type="email" name="email" id="exampleEmail2" placeholder="Enter your email" />
                            <Form.Text>
                                Una vez que haga click en cambiar, revise su correo para optener la contraseña que
                                generó el sistema
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Cambiar contraseña
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default CambiarPassword;
