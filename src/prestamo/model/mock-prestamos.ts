import { PrestamoPage } from "./PrestamoPage";

export const PRESTAMO_DATA: PrestamoPage = {

    content:[
        {id: 1, gameName: 'Juego 1', clientName: 'Cliente 1', iniDate: new Date(), endDate: new Date()},
        {id: 1, gameName: 'Juego 2', clientName: 'Cliente 2', iniDate: new Date(), endDate: new Date()},
        {id: 1, gameName: 'Juego 3', clientName: 'Cliente 3', iniDate: new Date(), endDate: new Date()},
        {id: 1, gameName: 'Juego 4', clientName: 'Cliente 4', iniDate: new Date(), endDate: new Date()},
        {id: 1, gameName: 'Juego 5', clientName: 'Cliente 5', iniDate: new Date(), endDate: new Date()},
        {id: 1, gameName: 'Juego 6', clientName: 'Cliente 6', iniDate: new Date(), endDate: new Date()},
        {id: 1, gameName: 'Juego 7', clientName: 'Cliente 7', iniDate: new Date(), endDate: new Date()},
    ],
    pageable: {
        pageSize: 5,
        pageNumber:0,
        sort: [{property: 'id', direction: 'ASC'}],
    },
    totalElements: 7,

}