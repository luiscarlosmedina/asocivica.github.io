import React from 'react'
import Conteonov from './graphic/conteonov';
import Conteosectornov from './graphic/conteosectornov';
export default function Repnov() {
    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <h3>Reporte de la operacion</h3>
                </div>
                <div>
                    <button type="button" className="btn btn-outline-success"> Descargar reporte </button>
                </div>
            </div>
            <hr />
            <div>

            </div>
            <div className='container max-width'>
                <div className='row h-50'>
                    <Conteonov />
                    <Conteosectornov />
                </div>
            </div>
        </>
    );
}
