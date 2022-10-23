// @flow

import React, { useState, useEffect, Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Button, Row, Container } from 'react-bootstrap';
import swal from 'sweetalert';

import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
// components
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { APICore } from '../../../../helpers/api/apiCore';
const api = new APICore();

const encriptar = (a) => {
    var key_base = 'contentWindowHig'; // El valor base de la clave de cifrado
    var iv_base = 'contentDocuments';
    let CryptoJS = require('crypto-js');
    var key_hash = CryptoJS.MD5(key_base);
    var key = CryptoJS.enc.Utf8.parse(key_hash);
    var iv = CryptoJS.enc.Utf8.parse(iv_base);
    var res = CryptoJS.AES.encrypt(a, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
    return res.toString();
};

class EditorConvertToHTML extends Component {
    constructor(props) {
        super(props);

        const html = '<p>' + props.contenido + '</p>';
        const contentBlock = htmlToDraft(html);

        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
                message: '.',
                rawMessage: '',
                id: props.state.id,
            };
        }

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.handleEditorStateToMessage = this.handleEditorStateToMessage.bind(this);
    }
    onEditorStateChange(editorState) {
        this.setState({
            editorState,
            rawMessage: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        });
    }

    handleEditorStateToMessage() {
        this.setState({
            message: this.state.rawMessage,
        });

        setTimeout(() => {
            swal({
                title: 'Registro guardado con exito!!',
                icon: 'success',
            });
            //actualizar contenido
            const texto = JSON.stringify(this.state.rawMessage);

            //console.log('texto', texto);

            const urla = `https://aulaweb.autoevaluacion.com.co/v2/?&accion=vistapreviacurso&opcion=actualizar&operacion=sindoc`;
            const forms = api.setEditarContenido(`${urla}`, `${this.state.id}`, `${texto}`);
            forms.then((res) => swal('' + res + ''));
        }, 200);
    }

    render() {
        /*
        const style = {
            'box-sizing': 'border-box',
            border: '1px solid #ddd',
            cursor: 'text',
            padding: '16px',
            'border-radius': '2px',
            'margin-bottom': '2em',
            'box-shadow': 'inset 0px 1px 8px -3px #ABABAB',
            background: '#fefefe',
        };
        */
        const { editorState } = this.state;
        const wrapperStyle = {
            border: '1px solid #969696',
        };
        const editorStyle = {
            height: '20rem',
            padding: '1rem',
        };

        return (
            <>
                <Container fluid>
                    <Row className="align-items-center">
                        <div style={{ marginTop: '5%' }}>
                            <Editor
                                wrapperStyle={wrapperStyle}
                                editorStyle={editorStyle}
                                toolbarStyle={{
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1000,
                                }}
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                            <textarea
                                hidden
                                disabled
                                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                            />
                        </div>

                        <div style={{ marginTop: '2%' }}>
                            <Button variant="danger" onClick={this.handleEditorStateToMessage}>
                                Enviar
                            </Button>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}
const EditorContenido = (props): React$Element<React$FragmentType> => {
    const [cursos, setCursos] = useState([]);
    const [titulo, setMapear] = useState([]);
    const [contenido, setcConstenido] = useState([]);
    useEffect(() => {
        const urla = `https://aulaweb.autoevaluacion.com.co/v2/?&accion=vistapreviacurso&id_autor=${props.state.id_pernatural}&grupo_id=${props.state.id_grupo}&cod_materia=${props.state.codmateria}&id_tema=${props.state.id_tema}&id_curso=${props.state.id_curso}&opcion=consultar&operacion=sindoc`;

        const curs = api.setConsultas(`${urla}`);
        curs.then(function (resp) {
            if (resp) {
                setCursos(resp);
            }
        });
    }, [props]);

    useEffect(() => {
        if (cursos && cursos.length > 0) {
            const cur = cursos;
            const mapped = [];
            mapped.push(cur);
            setMapear(mapped[0]);
        }
    }, [cursos]);

    useEffect(() => {
        titulo.length > 0 &&
            titulo.map((arrays: any, index) => {
                const html = arrays.titulos.items.contenido;
                html.length > 0 ? setcConstenido(html) : setcConstenido('<p>Digite aqui el contenido del curso</p>');
            });
    }, [titulo]);
    //console.log(contenido);

    return (
        <React.Fragment>
            {contenido.length > 0 && (
                <EditorConvertToHTML
                    contenido={contenido}
                    state={props.state}
                    popover={props.popover}
                    inputClass="form-control-light"
                    onState={props.onState}
                />
            )}
        </React.Fragment>
    );
};

export default EditorContenido;
