const Volunteer = require('../models/Volunteer');

const findMatch = async (studentTags) => {
  try {
    // Find volunteers who are available AND have at least one matching tag
    const matchedVolunteer = await Volunteer.findOne({
      isAvailable: true,
      tags: { $in: studentTags }   // MongoDB: any tag in student's list
    });

    if (matchedVolunteer) {
      return {
        found: true,
        volunteerId: matchedVolunteer._id,
        volunteerAlias: 'Peer-' + matchedVolunteer.username.substring(0, 4),
        matchedTags: matchedVolunteer.tags.filter(t => studentTags.includes(t))
      };
    }

    // Fallback: find any available volunteer even without tag match
    const anyVolunteer = await Volunteer.findOne({ isAvailable: true });
    if (anyVolunteer) {
      return {
        found: true,
        volunteerId: anyVolunteer._id,
        volunteerAlias: 'Peer-' + anyVolunteer.username.substring(0, 4),
        matchedTags: [],
        note: 'No exact tag match found, connected to available peer.'
      };
    }

    return {
      found: false,
      message: 'No volunteers are currently available. Please try again in a few minutes.'
    };
  } catch (err) {
    console.error('Matchmaker error:', err);
    return { found: false, message: 'Matching service error.' };
  }
};

module.exports = { findMatch };
