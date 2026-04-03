const emergencyWords = [
  'suicide', 'kill myself', 'end my life', 'want to die',
  'self harm', 'hurt myself', 'cutting', 'overdose',
  'can\'t go on', 'no reason to live', 'goodbye forever'
];

const flaggedWords = [
  'hopeless', 'worthless', 'depressed', 'panic attack',
  'can\'t breathe', 'breaking down', 'falling apart',
  'no one cares', 'hate myself', 'can\'t cope'
];

const scanForTriggers = (text) => {
  const lowerText = text.toLowerCase();

  const foundEmergency = emergencyWords.find(word => lowerText.includes(word));
  if (foundEmergency) {
    return {
      safe: false,
      riskLevel: 'emergency',
      triggeredWord: foundEmergency,
      action: 'divert_to_emergency'
    };
  }

  const foundFlagged = flaggedWords.find(word => lowerText.includes(word));
  if (foundFlagged) {
    return {
      safe: false,
      riskLevel: 'flagged',
      triggeredWord: foundFlagged,
      action: 'alert_volunteer'
    };
  }

  return {
    safe: true,
    riskLevel: 'safe',
    triggeredWord: null,
    action: 'proceed_to_chat'
  };
};

module.exports = { scanForTriggers };
