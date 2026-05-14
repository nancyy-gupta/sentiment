const lexicon = {
  comfortable: 3,
  cushioning: 3,
  cushioned: 3,
  breathable: 2,
  durable: 2,
  lightweight: 2,
  stylish: 2,
  supportive: 2,
  excellent: 3,
  amazing: 3,
  great: 2,
  good: 2,
  perfect: 3,
  love: 3,

  flimsy: -3,
  uncomfortable: -3,
  heavy: -2,
  tight: -2,
  poor: -3,
  bad: -2,
  terrible: -3,
  worst: -4,
  disappointing: -3,
  cheap: -2,
  hurts: -3,

  okay: 0,
  average: 0,
  normal: 0,
  decent: 1,
};

// Simple contextual logic inspired by transformers
function applyContext(words, score) {
  const negations = ['not', 'never', 'no'];

  for (let i = 0; i < words.length; i++) {
    if (negations.includes(words[i]) && i + 1 < words.length) {
      const next = words[i + 1];
      if (lexicon[next]) {
        score -= 2 * lexicon[next];
      }
    }

    // Common-sense logic
    if (words[i] === 'hours') {
      const prev = parseInt(words[i - 1]);
      if (!isNaN(prev) && prev >= 8) {
        score += 2;
      }
    }
  }

  return score;
}

// Softmax probability
function softmax(values) {
  const expVals = values.map(v => Math.exp(v));
  const sum = expVals.reduce((a, b) => a + b, 0);
  return expVals.map(v => v / sum);
}

export function analyzeSentiment(text) {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);

  let score = 0;

  words.forEach(word => {
    if (lexicon[word]) score += lexicon[word];
  });

  score = applyContext(words, score);

  let sentiment = 'Neutral';
  if (score > 1) sentiment = 'Good';
  else if (score < -1) sentiment = 'Bad';

  const [badProb, neutralProb, goodProb] = softmax([
    -score,
    1 - Math.abs(score) * 0.1,
    score,
  ]);

  return {
    score,
    sentiment,
    probabilities: {
      Good: (goodProb * 100).toFixed(1),
      Neutral: (neutralProb * 100).toFixed(1),
      Bad: (badProb * 100).toFixed(1),
    },
  };
}
