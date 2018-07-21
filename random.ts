export function* randomNumberGenerator(times: number, max = 15, seed = 42) {
  const prng = randomSeedParkMiller(seed);
  while (times > 0) {
    times--;
    const randomNumberBetweenZeroAndOne = prng();
    yield Math.round(randomNumberBetweenZeroAndOne * max);
  }
}

function randomSeedParkMiller(seed: number) {
  // doesn't repeat b4 JS dies.
  // https://gist.github.com/blixt/f17b47c62508be59987b
  seed = seed % 2147483647;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}
