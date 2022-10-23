// @flow
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// components
//import PageTitle from '../../../components/PageTitle';
import TaskItem from './Task';

// dummy data
import { tasks } from './Context/Data';
//import MenuPrincipal from './MenuPrincipal';
type StateType = {
    todoTasks: Array<any>,
    inprogressTasks: Array<any>,
    reviewTasks: Array<any>,
    doneTasks: Array<any>,
    totalTasks: number,
    active: number,
    status: string,
    codmateria: string,
    tipoactividad: number,
};

// kanban
const FichaTareas = (props): React$Element<React$FragmentType> => {
    const [state, setState] = useState<StateType>({
        todoTasks: tasks.filter((t) => t.status === props.state.status || t.codmateria === props.state.codmateria),
        totalTasks: tasks.length,
    });

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
        destClone.splice(droppableDestination.index, 0, removed);
        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;
        return result;
    };

    /**
     * Gets the list
     */
    const getList = (id) => state[id];

    /**
     * On drag end
     */
    const onDragEnd = (result) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const items = reorder(getList(source.droppableId), source.index, destination.index);
            let localState = { ...state };
            localState[source.droppableId] = items;
            setState(localState);
        } else {
            const result = move(getList(source.droppableId), getList(destination.droppableId), source, destination);
            const localState = { ...state, ...result };
            setState(localState);
        }
    };
    const style = {
        marginLeft: 0,
        paddingLeft: 0,
        listStyle: 'none',
    };
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="board">
                            {/* todo */}
                            <Droppable droppableId="todoTasks">
                                {(provided, snapshot) => (
                                    <div className="tasks" ref={provided.innerRef} style={style}>
                                        <h5 className="mt-0 task-header">
                                            {props.state.status} ({state.todoTasks.length})
                                        </h5>
                                        {state.todoTasks.length === 0 && (
                                            <p className="text-center text-muted pt-2 mb-0">No existen registros</p>
                                        )}

                                        {state.todoTasks.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id + ''} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}>
                                                        <TaskItem task={item} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </DragDropContext>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default FichaTareas;
