import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PrestamoEditComponent } from '../prestamo-edit/prestamo-edit.component';
import { PrestamoService } from '../prestamo.service';
import { Prestamo } from '../model/Prestamo';
import { Pageable } from '../../app/core/model/page/Pageable';
import { DialogConfirmationComponent } from '../../app/core/dialog-confirmation/dialog-confirmation.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClientService } from '../../client/client.service';
import { GameService } from '../../game/game.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Client } from '../../client/model/Client';
import { Game } from '../../game/model/Game';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-prestamo-list',
    standalone: true,
    imports: [
        MatButtonModule, 
        MatIconModule, 
        MatTableModule, 
        CommonModule, 
        MatPaginator,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    templateUrl: './prestamo-list.component.html',
    styleUrl: './prestamo-list.component.scss',
})
export class PrestamoListComponent implements OnInit {
    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;

    prestamos: Prestamo[];
    games: Game[];
    clients: Client[];
    filterGame: Game;
    filterClient: Client;
    filterDate: Date;
    

    dataSource = new MatTableDataSource<Prestamo>();
    displayedColumns: string[] = ['id', 'gameName', 'clientName', 'iniDate', 'endDate', 'action'];

    constructor(
        private prestamoService: PrestamoService, 
        private gameService: GameService,
        private clientService: ClientService,
        public dialog: MatDialog) {}

    ngOnInit(): void {
        this.loadPage();
        
        this.gameService.getGames().subscribe((games) => (this.games = games));
        
        this.clientService.getClients().subscribe((clients) => (this.clients = clients));
    }

    onCleanFilter(): void {
        this.filterGame = null;
        this.filterClient = null;
        this.filterDate = null;
        
        this.onSearch();
    }

    onSearch(): void {
        const pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [
                {
                    property: 'id',
                    direction: 'ASC',
                },
            ],
        };

        const clientName = this.filterClient != null ? this.filterClient.name : null;
        const gameName = this.filterGame != null ? this.filterGame.title : null;
        const fecha: Date = this.filterDate ? new Date(this.filterDate) : null;

        console.log(clientName)
        console.log(gameName)
        console.log(fecha)
    
        
        this.prestamoService.getPrestamos(pageable, gameName, clientName, fecha).subscribe((data) => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }


    loadPage(event?: PageEvent) {
        const pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [
                {
                    property: 'id',
                    direction: 'ASC',
                },
            ],
        };

        if (event != null) {
            pageable.pageSize = event.pageSize;
            pageable.pageNumber = event.pageIndex;
        }

        this.prestamoService.getPrestamos(pageable).subscribe((data) => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }

    createPrestamo() {
        const dialogRef = this.dialog.open(PrestamoEditComponent, {
            data: {},
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    deletePrestamo(prestamo: Prestamo) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: {
                title: 'Eliminar préstamo',
                description:
                    'Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.prestamoService.deletePrestamo(prestamo.id).subscribe((result) => {
                    this.ngOnInit();
                });
            }
        });
    }
}