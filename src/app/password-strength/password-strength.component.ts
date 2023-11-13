import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-strength.component.html',
  styleUrl: './password-strength.component.css'
})
export class PasswordStrengthComponent implements OnChanges {  
  @Input() public passwordToCheck!: string;
  @Output() passwordStrength = new EventEmitter<boolean>();
  [key: string]: any;
  bar0!: string;
  bar1!: string;
  bar2!: string;

  private colors = ['red', 'yellow', 'green'];

  checkStrength(p: string) {
    let force = 0;
  
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const letters = /[a-zA-Z]+/.test(p);
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);
  
    const flags = [letters, numbers, symbols];
  
    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }
  
    force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
    force += passedMatches * 10;
    force = (p.length <= 7) ? Math.min(force, 10) : force;
    force = (passedMatches === 1) ? Math.min(force, 10) : force;
    force = (passedMatches === 2) ? Math.min(force, 20) : force;
    force = (passedMatches === 3) ? Math.min(force, 30) : force;
    return force;
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToCheck'].currentValue;
    this.setBarColors(3, '#DDD');
    if (password.length === 0) {
      this.setBarColors(3, '#DDD');
    } else if  (password.length > 7) {
      const c = this.getColor(this.checkStrength(password));
      this.setBarColors(c.index, c.color);
    } else if (password.length < 8) {
      this.setBarColors(3, 'red');
    } 
  }
  
  private getColor(s: number) {
    let index = 0;
    if (s === 10) {
      index = 0;
    } else if (s === 20) {
      index = 1;
    } else if (s === 30) {
      index = 2;
    } else {
      index = 3;
    }
    return {
      index: index + 1,
      color: this.colors[index]
    };
  }
  
  private setBarColors(count: number, col: string ) {
    for (let n = 0; n < count; n++) {      
      this['bar' + n]= col;
    }
  }
}
