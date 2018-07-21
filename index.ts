import { randomNumberGenerator } from './random';
import { Pillar } from './pillar';
import { fillWater } from './algorithm';

document.addEventListener('DOMContentLoaded', main);

async function main() {
  const pillars = loadPillars();
  await fillWater(pillars, () => drawPillars(pillars));
}

function loadPillars() {
  // return Array.from(randomNumberGenerator(42, 20, Math.random() * 100000)).map(
  return Array.from(randomNumberGenerator(450, 300, Math.random() * 100000)).map(
    height => new Pillar(height)
  );
}

function drawPillars(pillars: Pillar[]) {
  const container = document.createElement('div');
  const firstChild = document.body.firstChild;
  if (firstChild) document.body.removeChild(firstChild);
  document.body.appendChild(container);
  pillars
    .map((pillar, index) => drawPillar(pillar, index))
    .forEach(element => container.appendChild(element));

  const volumeCount = document.createElement('div');
  volumeCount.innerText = pillars.reduce((sum, el) => el.waterLevel + sum, 0).toString();
  volumeCount.style.position = 'fixed';
  container.appendChild(volumeCount);
}

function drawPillar(pillar: Pillar, offset: number): HTMLDivElement {
  const pillarBaseDimensions = { widht: 3, height: 2 };
  // const pillarBaseDimensions = { widht: 30, height: 20 };
  const container = document.createElement('div');
  container.appendChild(
    drawBox(
      pillarBaseDimensions.widht,
      (pillar.height + 1) * pillarBaseDimensions.height,
      offset * pillarBaseDimensions.widht,
      0,
      'limegreen'
    )
  );
  if (pillar.waterLevel)
    container.appendChild(
      drawBox(
        pillarBaseDimensions.widht,
        pillar.waterLevel * pillarBaseDimensions.height,
        offset * pillarBaseDimensions.widht,
        (pillar.height + 1) * pillarBaseDimensions.height,
        'blue'
      )
    );
  return container;
}

function drawBox(width: number, height: number, left: number, bottom: number, color: string) {
  const container = document.createElement('div');
  if (height > 5 && width > 5) container.innerText = `${height}`;
  container.style.height = `${height}px`;
  container.style.width = `${width}px`;
  container.style.position = 'absolute';
  container.style.left = `${left}px`;
  // container.style.borderLeft = '1px dotted green';
  container.style.bottom = `${bottom}px`;
  container.style.background = color;
  return container;
}
