// @flow
//import React, { useState } from 'react';
import classNames from 'classnames';
import { Row, Col, Card, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
// @flow

import { Link } from 'react-router-dom';
type AttachmentsItems = {
    id: number,
    filename: string,
    size: string,
};

type TaskItemProps = {
    task: {
        id: number,
        title: string,
        status: string,
        priority: string,
        userAvatar: string,
        project: string,
        periodo: string,
        totalComments: number,
        totalSubTasks: number,
        user: string,
        dueDate: string,
        description: string,
        attachments: Array<AttachmentsItems>,
    },
};

// task item
const TaskItem = (props: TaskItemProps): React$Element<any> => {
    const task = props.task || {};

    return (
        <Card className="mb-0">
            <Card.Body className="p-3">
                <small className="float-end text-muted">{task.dueDate}</small>
                <span
                    className={classNames('badge', {
                        'bg-danger': task.priority === 'High',
                        'bg-secondary': task.priority === 'Medium',
                        'bg-success': task.priority === 'Low',
                    })}>
                    {task.priority}
                </span>

                <h5 className="mt-2 mb-2">
                    <a href="/" className="text-body">
                        {task.title}
                    </a>
                </h5>

                <p className="mb-0">
                    <span className="pe-2 text-nowrap mb-2 d-inline-block">
                        Capitulo/Semana:{' '}
                        <b>
                            {task.periodo}/{task.periodo}
                        </b>
                    </span>
                    <span className="text-nowrap mb-2 d-inline-block">
                        Periodo : <b>{task.periodo} </b>Grupo : <b>{task.periodo}</b>
                    </span>
                    <span className="text-nowrap mb-2 d-inline-block">
                        Actividad : <b>{task.project} </b>
                    </span>
                </p>
                <p className="mb-0">
                    <img src={task.userAvatar} alt={task.user} className="avatar-xs rounded-circle me-1" />
                    <span className="align-middle">{task.user}</span>
                </p>

                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle
                        variant="link"
                        className="text-muted card-drop arrow-none cursor-pointer p-0 shadow-none">
                        <i className="mdi mdi-dots-vertical font-18"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <i className="mdi mdi-pencil me-1"></i>Edit
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <i className="mdi mdi-delete me-1"></i>Delete
                        </Dropdown.Item>
                        <Dropdown.Item divider />
                        <Dropdown.Item>
                            <i className="mdi mdi-plus-circle-outline me-1"></i>Add People
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <i className="mdi mdi-exit-to-app me-1"></i>Leave
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <h5 className="mt-4 mb-2 font-16">Attachments</h5>
                {/* attachments */}
                {task.attachments.map((f, index) => {
                    const ext = f.filename.substr(f.filename.lastIndexOf('.') + 1);
                    return (
                        <Card key={index} className="mb-2 shadow-none border">
                            <div className="p-1">
                                <Row className="align-items-center">
                                    <Col className="col-auto">
                                        <div className="avatar-sm">
                                            <span className="avatar-title rounded">.{ext}</span>
                                        </div>
                                    </Col>
                                    <Col className="ps-0">
                                        <Link to="#" className="text-muted fw-bold">
                                            {f.filename}
                                        </Link>
                                        <p className="mb-0">{f.size}</p>
                                    </Col>
                                    <Col className="col-auto">
                                        <OverlayTrigger placement="left" overlay={<Tooltip>Download</Tooltip>}>
                                            <Link
                                                to="#"
                                                id="btn-download"
                                                className="btn btn-link text-muted btn-lg p-0 me-1">
                                                <i className="uil uil-cloud-download"></i>
                                            </Link>
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="left" overlay={<Tooltip>Delete</Tooltip>}>
                                            <Link
                                                to="#"
                                                id="btn-Delete"
                                                className="btn btn-link text-danger btn-lg p-0">
                                                <i className="uil uil-multiply"></i>
                                            </Link>
                                        </OverlayTrigger>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    );
                })}
            </Card.Body>
        </Card>
    );
};

export default TaskItem;
