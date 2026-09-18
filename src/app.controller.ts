import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Criminal } from './Criminal.js';
import * as fs from 'node:fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get('/piros-kek')
  @Render('red-blue')
  getRedBlue() {
    const random = Math.random();
    let bgColor=random > 0.5 ? 'red' : 'blue';
    return {
      bgColor
    }
  }
  @Get('/wanted')
  @Render('wanted')
  getWanted() {
    const criminal = JSON.parse(
      fs.readFileSync('wanted.json', {encoding: 'utf-8'})
    ) as Criminal;
    return {
      criminal
    }
  }

  @Get('/search')
  @Render('search')
  searchCrime(@Query('keresett') keresett: string) {
    if(!keresett) {
      return {
        talalatok: []
      }
    }
    const criminal = JSON.parse(
      fs.readFileSync('wanted.json', {encoding: 'utf-8'})
    ) as Criminal;
    return {
      talalatok: criminal.crimes.filter(crime => crime.toLowerCase().includes(keresett.toLowerCase()))
    }
  }


  //Innentől vannak a feladatok

  @Get('/colorpicker')
  @Render('colorpick')
  ColorPicker(@Query('color') color: string) {
    let colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white'];
    const selectedColor = colors.includes(color) ? color : 'black';
    return {
      colors,
      selectedColor
    }
  }

  @Get('/quadratic')
  @Render('szamolo')
  getquadratic(@Query('szamok') szamok: number[]) {
    
   
  }
}
