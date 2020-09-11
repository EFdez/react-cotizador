import React from 'react';
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import { primeraMayuscula } from '../helper'

const ContendorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #EEEEEE;
    color: #24799e;
    font-weight: bold;
    font-size:1.1em;
    font-space:1.3em;

    li{
        margin-left: -25px;
    }
`

const Resumen = ({ datos }) => {

    const { marca, year, plan } = datos
    if (marca === "" | year === "" | plan === "") return null

    return (
        <ContendorResumen>
            <h2>Resultado de Cotización</h2>
            <ul>
                <li>Marca: {primeraMayuscula(marca)}</li>
                <li>Plan: {primeraMayuscula(plan)}</li>
                <li>Año: {year}</li>
            </ul>
        </ContendorResumen>
    );
}

Resumen.propTypes = {
    datos: PropTypes.object.isRequired
}

export default Resumen;