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

  // Check emergency tier first (higher priority)
  const foundEmergency = emergencyWords.find(word => lowerText.includes(word));
  if (foundEmergency) {
    return {
      safe: false,
      riskLevel: 'emergency',
      triggeredWord: foundEmergency,
      message: 'Emergency resources are being shown to the student.',
      action: 'divert_to_emergency'
    };
  }

  // Check flagged tier
  const foundFlagged = flaggedWords.find(word => lowerText.includes(word));
  if (foundFlagged) {
    return {
      safe: false,
      riskLevel: 'flagged',
      triggeredWord: foundFlagged,
      message: 'Message contains distress signals. Volunteer has been alerted.',
      action: 'alert_volunteer'
    };
  }

  // All clear
  return {
    safe: true,
    riskLevel: 'safe',
    triggeredWord: null,
    message: 'Message is safe.',
    action: 'proceed_to_chat'
  };
};

module.exports = { scanForTriggers };
