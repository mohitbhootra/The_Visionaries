const adjectives = [
  'Blue', 'Silent', 'Calm', 'Swift', 'Bright',
  'Gentle', 'Quiet', 'Kind', 'Brave', 'Clear'
];
const nouns = [
  'Falcon', 'River', 'Cloud', 'Ember', 'Stone',
  'Willow', 'Spark', 'Harbor', 'Meadow', 'Ridge'
];

const generateAlias = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 99) + 1;
  return `${adj}${noun}${num}`;
};

module.exports = generateAlias;