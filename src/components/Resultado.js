import React from 'react';
import styled from '@emotion/styled';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

const Mensaje = styled.p`
    background-color: #24799e;
    margin-top: 2rem;
    padding: 1rem;
    text-align: center;
    color: white;
    text-size: 2em;
`

const ResultadoCotizacion = styled.div`
    text-align:center;
    padding: .5rem;
    background-color: #24799e;
    margin-top: 1rem;
    position: relative;
    text-transform: uppercase;
`


const Resultado = ({ cotizacion }) => {
    return (
        (cotizacion === 0)
            ? <Mensaje> Elige marca, año y tipo de seguro</Mensaje>
            : (
                <ResultadoCotizacion>
                    <TransitionGroup
                        component="span"
                        className="resultado"
                    >
                        <CSSTransition
                            classNames="resultado"
                            key={cotizacion}
                            timeout={{ enter: 3500, exit: 3500 }}
                        >
                            <Mensaje>El total es: <span> ${cotizacion}</span></Mensaje>
                        </CSSTransition>
                    </TransitionGroup>
                </ResultadoCotizacion>
            )
    )
}

Resultado.propTypes = {
    cotizacion: PropTypes.number.isRequired
}

export default Resultado;