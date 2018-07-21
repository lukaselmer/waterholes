import { Pillar } from './pillar';

export async function fillWater(pillars: Pillar[], redraw: () => void) {
  redraw();
  const drawer = new Drawer(pillars, redraw, 0, true);
  const maxHeight = Math.max(...pillars.map(p => p.height));
  for (const pillar of pillars) pillar.waterLevel = maxHeight - pillar.height;
  redraw();

  await drawer.changeWaterLevel(0, 0);
  await drawer.changeWaterLevel(pillars.length - 1, 0);

  drawer.drawingSpeed = 5;

  let prevHeight = 0;
  for (let index = 1; index < pillars.length - 1; ++index) {
    const pillar = pillars[index];
    prevHeight = Math.max(prevHeight, pillars[index - 1].height);
    const newWaterLevel = Math.min(pillar.waterLevel, Math.max(prevHeight - pillar.height, 0));
    await drawer.changeWaterLevel(index, newWaterLevel);
    if (pillar.height === maxHeight) break;
  }

  prevHeight = 0;
  for (let index = pillars.length - 2; index > 0; --index) {
    const pillar = pillars[index];
    prevHeight = Math.max(prevHeight, pillars[index + 1].height);
    const newWaterLevel = Math.min(pillar.waterLevel, Math.max(prevHeight - pillar.height, 0));
    pillars[index].waterLevel = newWaterLevel;
    await drawer.changeWaterLevel(index, newWaterLevel);
    if (pillar.height === maxHeight) break;
  }

  redraw();
}

class Drawer {
  constructor(
    private pillars: Pillar[],
    public redraw: () => void,
    public drawingSpeed = 0,
    public animation = true
  ) {}

  async changeWaterLevel(pillarIndex: number, waterLevel: number) {
    this.pillars[pillarIndex].waterLevel = waterLevel;
    if (this.animation) {
      await new Promise(resolve => setTimeout(resolve, this.drawingSpeed));
      this.redraw();
    }
  }
}
