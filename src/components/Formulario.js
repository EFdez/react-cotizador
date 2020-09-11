import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types'

import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper'

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`

const Label = styled.label`
    flex: 0 0 100px;
`

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #24799e;
    -webkit-appearance: none;
`

const InputRadio = styled.input`
    margin:0 1rem;
`

const Boton = styled.button`
   background-color: #24799e;
   font-size: 16px;
   padding:1rem;
   width: 100%;
   color: white;
   text-transform: uppercase;
   font-weight: bold;
   border: none;
   transition: background-color .3s ease;
   margin-top:2rem;

   &:hover {
       cursor:pointer;
       background-color: #274754;
   }
`
const Error = styled.div`
      background-color: red;
      color:white;
      padding:1rem;
      width:100%;
      text-align: center;
      margin-bottom: 2rem;
    `;


const Formulario = ({ guardarResumen, guardarCargando }) => {
    const [datos, guardarDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const { marca, year, plan } = datos

    const [error, guardarError] = useState(false)

    const obtenerInformacion = e => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const cotizarSeguro = e => {
        e.preventDefault()
        if (marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            guardarError(true)
            return
        }
        guardarError(false)

        //diferencia
        let resultado = 2000
        const diferencia = obtenerDiferenciaYear(year)
        //restar 3% cada año
        resultado -= ((diferencia * 3) * resultado) / 100

        //americano, asiatico, europeo
        resultado = calcularMarca(marca) * resultado

        //básico aumenta 20% completo aumenta 50%
        const incrementoPlan = obtenerPlan(plan)
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2)
        //total


        guardarCargando(true)

        setTimeout(() => {
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            })
            guardarCargando(false)

        }, 3000)
    }

    return (
        <form
            onSubmit={cotizarSeguro}
        >
            {error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Selecciona --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiático</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Selecciona --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name='plan'
                    value='basico'
                    check={plan === 'basico'}
                    onChange={obtenerInformacion}
                /> Básico
                <InputRadio
                    type="radio"
                    name='plan'
                    value='completo'
                    check={plan === 'completo'}
                    onChange={obtenerInformacion}
                /> Completo
            </Campo>

            <Boton type='submit'>
                Cotizar
            </Boton>
        </form>
    );
}

Formulario.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired,
}

export default Formulario;