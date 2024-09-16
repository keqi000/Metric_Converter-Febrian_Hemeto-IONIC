import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';

import { trigger, transition, style, animate } from '@angular/animations';

type ConversionRates = {
  [key: string]: {
    [key: string]: number | ((value: number) => number);
  };
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomePage {
  selectedMetric: string | null = null;
  selectedUnitFrom: string | null = null;
  selectedUnitTo: string | null = null;
  inputValue: number | null = null;
  conversionResult: { value: number; unit: string } | null = null;
  units: string[] = [];
  conversionExplanation: string | null = null;

  // Daftar satuan untuk setiap metrik
  unitLabels: { [key: string]: { [key: string]: string } } = {
    length: {
      Millimeter: 'mm',
      Centimeter: 'cm',
      Decimeter: 'dm',
      Meter: 'm',
      Dekameter: 'dam',
      Hektometer: 'hm',
      Kilometer: 'km',
    },
    mass: {
      Milligram: 'mg',
      Centigram: 'cg',
      Decigram: 'dg',
      Gram: 'g',
      Hektogram: 'hg',
      Kilogram: 'kg',
      Ton: 't',
    },
    time: {
      Millisecond: 'ms',
      Second: 's',
      Minute: 'min',
      Hour: 'h',
      Day: 'day',
      Week: 'week',
    },
    volume: {
      Milliliter: 'mL',
      Centiliter: 'cL',
      Deciliter: 'dL',
      Liter: 'L',
      Decaliter: 'daL',
      Hectoliter: 'hL',
      Kiloliter: 'kL',
    },
    temperature: {
      Celsius: '°C',
      Fahrenheit: '°F',
      Kelvin: 'K',
    },
    'luminous intensity': {
      Candela: 'cd',
    },
    'amount of substance': {
      Mole: 'mol',
      Millimole: 'mmol',
    },
    'electric current': {
      Milliampere: 'mA',
      Ampere: 'A',
      Kiloampere: 'kA',
    },
  };

  constructor() {}

  interestingFacts: string | null = null;

  metricFacts: { [key: string]: string } = {
    length:
      'Satuan panjang kilometer (km) digunakan untuk mengukur jarak jauh seperti perjalanan antar kota.',
    mass: 'Satuan kilogram (kg) adalah satuan dasar untuk massa dalam sistem metrik dan sering digunakan untuk mengukur berat tubuh manusia.',
    time: 'Satuan jam (h) adalah satuan waktu yang umum digunakan dalam kehidupan sehari-hari untuk mengukur durasi.',
    'electric current':
      'Satuan ampere (A) digunakan untuk mengukur jumlah arus listrik yang mengalir dalam sirkuit listrik.',
    temperature:
      'Satuan Kelvin (K) adalah satuan suhu dalam sistem internasional dan digunakan dalam pengukuran suhu absolut.',
    'luminous intensity':
      'Satuan candela (cd) mengukur kekuatan cahaya dari sumber cahaya tertentu dalam arah tertentu.',
    'amount of substance':
      'Satuan mol (mol) digunakan dalam kimia untuk mengukur jumlah zat berdasarkan jumlah partikel.',
  };

  explanation: string | null = null;

  metricExplanations: { [key: string]: string } = {
    length:
      'Panjang adalah ukuran jarak atau panjang benda. Contoh satuan panjang termasuk milimeter, sentimeter, meter, dan kilometer.',
    mass: 'Massa adalah ukuran jumlah materi dalam suatu objek. Contoh satuan massa termasuk gram, kilogram, dan ton.',
    time: 'Waktu adalah ukuran durasi dari suatu kejadian. Contoh satuan waktu termasuk detik, menit, dan jam.',
    'electric current':
      'Arus listrik adalah aliran muatan listrik. Contoh satuan arus listrik termasuk miliampere, ampere, dan kiloampere.',
    temperature:
      'Suhu adalah ukuran panas atau dingin suatu benda. Contoh satuan suhu termasuk Celsius, Fahrenheit, dan Kelvin.',
    'luminous intensity':
      'Intensitas cahaya adalah ukuran kekuatan sumber cahaya. Contoh satuan intensitas cahaya termasuk candela.',
    'amount of substance':
      'Jumlah zat adalah ukuran jumlah partikel dalam suatu zat. Contoh satuan jumlah zat termasuk mol dan milimol.',
  };

  onMetricChange() {
    this.resetConversion();
    switch (this.selectedMetric) {
      case 'length':
        this.units = [
          'Millimeter',
          'Centimeter',
          'Decimeter',
          'Meter',
          'Dekameter',
          'Hektometer',
          'Kilometer',
        ];
        this.explanation = this.metricExplanations['length'];
        this.interestingFacts = this.metricFacts['length'];
        break;
      case 'mass':
        this.units = [
          'Milligram',
          'Centigram',
          'Decigram',
          'Gram',
          'Hektogram',
          'Kilogram',
          'Ton',
        ];
        this.explanation = this.metricExplanations['mass'];
        this.interestingFacts = this.metricFacts['mass'];
        break;
      case 'time':
        this.units = ['Millisecond', 'Second', 'Minute', 'Hour', 'Day', 'Week'];
        this.explanation = this.metricExplanations['time'];
        this.interestingFacts = this.metricFacts['time'];
        break;
      case 'volume':
        this.units = [
          'Milliliter',
          'Centiliter',
          'Deciliter',
          'Liter',
          'Decaliter',
          'Hectoliter',
          'Kiloliter',
        ];
        this.explanation = this.metricExplanations['volume'];
        this.interestingFacts = this.metricFacts['volume'];
        break;
      case 'temperature':
        this.units = ['Celsius', 'Fahrenheit', 'Kelvin'];
        this.explanation = this.metricExplanations['temperature'];
        this.interestingFacts = this.metricFacts['temperature'];
        break;
      case 'luminous intensity':
        this.units = ['Candela'];
        this.explanation = this.metricExplanations['luminous intensity'];
        this.interestingFacts = this.metricFacts['luminous intensity'];
        break;
      case 'amount of substance':
        this.units = ['Mole', 'Millimole'];
        this.explanation = this.metricExplanations['amount of substance'];
        this.interestingFacts = this.metricFacts['amount of substance'];
        break;
      case 'electric current':
        this.units = ['Milliampere', 'Ampere', 'Kiloampere'];
        this.explanation = this.metricExplanations['electric current'];
        this.interestingFacts = this.metricFacts['electric current'];
        break;
      default:
        this.units = [];
        this.explanation = null;
        this.interestingFacts = null;
        break;
    }
  }

  get isInputDisabled(): boolean {
    return !this.selectedMetric;
  }

  onUnitChange() {
    this.resetConversion();
  }

  resetConversion() {
    this.inputValue = null;
    this.conversionResult = null;
    this.conversionExplanation = null; // Tambahkan ini
  }

  onConvert() {
    if (
      this.selectedUnitFrom &&
      this.selectedUnitTo &&
      this.inputValue !== null
    ) {
      const result = this.convertUnits(
        this.selectedUnitFrom,
        this.selectedUnitTo,
        this.inputValue
      );
      this.conversionResult = {
        value: result,
        unit: this.unitLabels[this.selectedMetric!][this.selectedUnitTo!],
      };
      this.generateConversionExplanation(
        this.selectedUnitFrom,
        this.selectedUnitTo,
        this.inputValue,
        result
      );
    } else {
      this.conversionResult = null;
      this.conversionExplanation = null;
    }
  }

  generateConversionExplanation(
    from: string,
    to: string,
    inputValue: number,
    result: number
  ) {
    let explanation = `Konversi dari ${from} ke ${to}:\n\n`;

    if (this.selectedMetric === 'length') {
      const conversionRates = this.getConversionRates()['length'];
      const rateFrom = conversionRates[from] as number;
      const rateTo = conversionRates[to] as number;

      explanation += `1 ${from} = ${rateFrom} mm\n`;
      explanation += `1 ${to} = ${rateTo} mm\n\n`;
      explanation += `${inputValue} ${from} = ${inputValue} × ${rateFrom} = ${
        inputValue * rateFrom
      } mm\n`;
      explanation += `${inputValue * rateFrom} mm = ${
        inputValue * rateFrom
      } ÷ ${rateTo} = ${result} ${to}\n\n`;
      explanation += `Jadi, ${inputValue} ${from} = ${result} ${to}`;
    } else if (this.selectedMetric === 'temperature') {
      if (from === 'Celsius' && to === 'Fahrenheit') {
        explanation += `Formula: (°C × 9/5) + 32 = °F\n`;
        explanation += `(${inputValue}°C × 9/5) + 32 = ${result}°F`;
      } else if (from === 'Fahrenheit' && to === 'Celsius') {
        explanation += `Formula: (°F - 32) × 5/9 = °C\n`;
        explanation += `(${inputValue}°F - 32) × 5/9 = ${result}°C`;
      } else if (from === 'Celsius' && to === 'Kelvin') {
        explanation += `Formula: °C + 273.15 = K\n`;
        explanation += `${inputValue}°C + 273.15 = ${result}K`;
      } else if (from === 'Kelvin' && to === 'Celsius') {
        explanation += `Formula: K - 273.15 = °C\n`;
        explanation += `${inputValue}K - 273.15 = ${result}°C`;
      } else if (from === 'Fahrenheit' && to === 'Kelvin') {
        explanation += `Formula: (°F - 32) × 5/9 + 273.15 = K\n`;
        explanation += `(${inputValue}°F - 32) × 5/9 + 273.15 = ${result}K`;
      } else if (from === 'Kelvin' && to === 'Fahrenheit') {
        explanation += `Formula: (K - 273.15) × 9/5 + 32 = °F\n`;
        explanation += `(${inputValue}K - 273.15) × 9/5 + 32 = ${result}°F`;
      }
    } else {
      // Untuk metrik lainnya
      const conversionRates = this.getConversionRates();
      if (this.selectedMetric && conversionRates[this.selectedMetric]) {
        const metricRates = conversionRates[this.selectedMetric];
        const rateFrom = metricRates[from];
        const rateTo = metricRates[to];

        if (typeof rateFrom === 'number' && typeof rateTo === 'number') {
          explanation += `1 ${from} = ${rateFrom} satuan dasar\n`;
          explanation += `1 ${to} = ${rateTo} satuan dasar\n\n`;
          explanation += `${inputValue} ${from} = ${inputValue} × ${rateFrom} = ${
            inputValue * rateFrom
          } satuan dasar\n`;
          explanation += `${inputValue * rateFrom} satuan dasar = ${
            inputValue * rateFrom
          } ÷ ${rateTo} = ${result} ${to}\n\n`;
          explanation += `Jadi, ${inputValue} ${from} = ${result} ${to}`;
        } else {
          explanation += `Konversi khusus diperlukan untuk ${this.selectedMetric}.`;
        }
      } else {
        explanation += `Metrik tidak valid atau tidak memiliki rates konversi.`;
      }
    }

    this.conversionExplanation = explanation;
  }

  getConversionRates(): ConversionRates {
    return {
      length: {
        Millimeter: 1,
        Centimeter: 10,
        Decimeter: 100,
        Meter: 1000,
        Dekameter: 10000,
        Hektometer: 100000,
        Kilometer: 1000000,
      },
      mass: {
        Milligram: 0.001,
        Centigram: 0.01,
        Decigram: 0.1,
        Gram: 1,
        Hektogram: 100,
        Kilogram: 1000,
        Ton: 1000000,
      },
      time: {
        Millisecond: 0.001,
        Second: 1,
        Minute: 60,
        Hour: 3600,
        Day: 86400,
        Week: 604800,
      },
      volume: {
        Milliliter: 0.001,
        Centiliter: 0.01,
        Deciliter: 0.1,
        Liter: 1,
        Decaliter: 10,
        Hectoliter: 100,
        Kiloliter: 1000,
      },
      temperature: {
        Celsius: 1,
        Fahrenheit: (value: number) => (value * 9) / 5 + 32,
        Kelvin: (value: number) => value + 273.15,
      },
      'luminous intensity': {
        Candela: 1,
      },
      'amount of substance': {
        Mole: 1,
        Millimole: 0.001,
      },
      'electric current': {
        Milliampere: 0.001,
        Ampere: 1,
        Kiloampere: 1000,
      },
    };
  }

  convertUnits(from: string, to: string, value: number): number {
    const conversionRates: {
      [key: string]: { [key: string]: number | ((value: number) => number) };
    } = {
      length: {
        Millimeter: 1,
        Centimeter: 10,
        Decimeter: 100,
        Meter: 1000,
        Dekameter: 10000,
        Hektometer: 100000,
        Kilometer: 1000000,
      },
      mass: {
        Milligram: 0.001,
        Centigram: 0.01,
        Decigram: 0.1,
        Gram: 1,
        Hektogram: 100,
        Kilogram: 1000,
        Ton: 1000000,
      },
      time: {
        Millisecond: 0.001,
        Second: 1,
        Minute: 60,
        Hour: 3600,
        Day: 86400,
        Week: 604800,
      },
      volume: {
        Milliliter: 0.001,
        Centiliter: 0.01,
        Deciliter: 0.1,
        Liter: 1,
        Decaliter: 10,
        Hectoliter: 100,
        Kiloliter: 1000,
      },
      temperature: {
        Celsius: 1,
        Fahrenheit: (value: number) => (value * 9) / 5 + 32,
        Kelvin: (value: number) => value + 273.15,
      },
      'luminous intensity': {
        Candela: 1,
      },
      'amount of substance': {
        Mole: 1,
        Millimole: 0.001,
      },
      'electric current': {
        Milliampere: 0.001,
        Ampere: 1,
        Kiloampere: 1000,
      },
    };

    const metricRates = conversionRates[this.selectedMetric!];
    const rateFrom = metricRates[from];
    const rateTo = metricRates[to];

    if (this.selectedMetric === 'temperature') {
      // temperature conversion
      if (from === 'Celsius' && to === 'Fahrenheit') {
        return (value * 9) / 5 + 32;
      } else if (from === 'Fahrenheit' && to === 'Celsius') {
        return ((value - 32) * 5) / 9;
      } else if (from === 'Celsius' && to === 'Kelvin') {
        return value + 273.15;
      } else if (from === 'Kelvin' && to === 'Celsius') {
        return value - 273.15;
      } else if (from === 'Fahrenheit' && to === 'Kelvin') {
        return ((value - 32) * 5) / 9 + 273.15;
      } else if (from === 'Kelvin' && to === 'Fahrenheit') {
        return ((value - 273.15) * 9) / 5 + 32;
      } else {
        throw new Error('Invalid temperature conversion');
      }
    } else if (typeof rateFrom === 'number' && typeof rateTo === 'number') {
      // General conversion
      const valueInBaseUnit = value * rateFrom;
      return valueInBaseUnit / rateTo;
    } else if (typeof rateFrom === 'function' && typeof rateTo === 'function') {
      // Special case for temperature conversions
      const valueInBaseUnit = rateFrom(value);
      return rateTo(valueInBaseUnit);
    } else {
      throw new Error('Invalid conversion');
    }
  }
}
