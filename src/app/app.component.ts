import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface TimeWindow {
  start: string,
  stop: string
}

interface IntWindow {
  start: number,
  stop: number
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Free Windows';

  busy: TimeWindow[] = [
    {
      'start': '10:30',
      'stop': '10:50'
    },
    {
      'start': '18:40',
      'stop': '18:50'
    },
    {
      'start': '14:40',
      'stop': '15:50'
    },
    {
      'start': '16:40',
      'stop': '17:20'
    },
    {
      'start': '20:05',
      'stop': '20:20'
    }
  ]
  
  get freeWindows() {
    const free: TimeWindow[] = []
    let currentStart = 9 * 60
    const finish = 21 * 60

    const totalMinutes = (time: string) => {
      const [hours, minutes] = time.split(':')
      return +hours * 60 + +minutes
    }
    
    const timeToString = (minutes: number) => {
      const withZero = (n: number) => n < 10 ? '0' + n : `${n}`
      return withZero(Math.floor(minutes / 60)) + ':' + withZero(minutes % 60)
    }

    const convertedBusy: IntWindow[] = this.busy.map(window => {
      return {'start': totalMinutes(window.start), 'stop': totalMinutes(window.stop)}})
    convertedBusy.sort((a: IntWindow, b: IntWindow) => a.start - b.start)

    convertedBusy.forEach(time => {
      while (currentStart + 30 <= time.start) {
        free.push({start: timeToString(currentStart), stop: timeToString(currentStart + 30)})
        currentStart += 30
      }
      currentStart = time.stop
    })

    while (currentStart + 30 <= finish) {
      free.push({start: timeToString(currentStart), stop: timeToString(currentStart + 30)})
      currentStart += 30
    }

    return free
  }
 
}
