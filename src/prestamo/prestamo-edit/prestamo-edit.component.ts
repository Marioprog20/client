import { ChangeDetectionStrategy, Inject, Component, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PrestamoService } from '../prestamo.service';
import { Prestamo } from '../model/Prestamo';
import { ClientService } from '../../client/client.service';
import { Client } from '../../client/model/Client';
import { GameService } from '../../game/game.service';
import { Game } from '../../game/model/Game';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-prestamo-edit',
  standalone:true, 
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    MatDatepickerModule,
  ],
  templateUrl: './prestamo-edit.component.html',
  styleUrl: './prestamo-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrestamoEditComponent implements OnInit{
  prestamo: Prestamo;
  filterGame: Game;
  filterClient: Client;
  filterIniDate: Date;
  filterEndDate: Date;
  games: Game[];
  clients: Client[];

  constructor(
    public dialogRef: MatDialogRef<PrestamoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private prestamoService: PrestamoService,
    private gameService: GameService,
    private clientService: ClientService,
  ){}
  ngOnInit(): void {
    this.prestamo = this.data.prestamo ?Object.assign({}, this.data.game) : new Game();

    this.gameService.getGames().subscribe((games) => {
      this.games = games;
    })
      if (this.prestamo.gameName != null) {
        const gameNameDropdown: Game[] = this.games.filter(
            (game) => game.id == this.data.prestamo.game.id
        );
        if (gameNameDropdown != null) {
            this.prestamo.gameName = gameNameDropdown[0].title;
        }
    }

    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    })
      if (this.prestamo.clientName != null) {
        const clientNameDropdown: Client[] = this.clients.filter(
            (client) => client.id == this.data.prestamo.client.id
        );
        if (clientNameDropdown != null) {
            this.prestamo.clientName = clientNameDropdown[0].name;
        }
    }
  }

  onSave(){
    this.prestamo.gameName = this.filterGame.title ;
    this.prestamo.clientName = this.filterClient.name ;
    this.prestamo.iniDate = this.filterIniDate ;
    this.prestamo.endDate = this.filterEndDate ;
    
    console.log(this.prestamo.gameName)
    console.log(this.prestamo.clientName)
    console.log(this.prestamo.iniDate)
    console.log(this.prestamo.endDate)
    this.prestamoService.savePrestamo(this.prestamo).subscribe((result) => {
      this.dialogRef.close();
    })
  }

  onClose(){
    this.dialogRef.close();
  }

}
