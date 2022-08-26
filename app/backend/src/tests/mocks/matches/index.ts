import Match from '../../../database/models/match';

export const allMatches = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Internacional',
    },
    teamAway: {
      teamName: 'Santos',
    },
  },
  {
    id: 3,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: 'Corinthians',
    },
    teamAway: {
      teamName: 'Napoli-SC',
    },
  },
  {
    id: 4,
    homeTeam: 3,
    homeTeamGoals: 0,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: 'Botafogo',
    },
    teamAway: {
      teamName: 'Bahia',
    },
  },
  {
    id: 5,
    homeTeam: 7,
    homeTeamGoals: 1,
    awayTeam: 10,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Flamengo',
    },
    teamAway: {
      teamName: 'Minas Brasília',
    },
  },
  {
    id: 6,
    homeTeam: 5,
    homeTeamGoals: 1,
    awayTeam: 13,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Cruzeiro',
    },
    teamAway: {
      teamName: 'Real Brasília',
    },
  },
  {
    id: 7,
    homeTeam: 12,
    homeTeamGoals: 2,
    awayTeam: 6,
    awayTeamGoals: 2,
    inProgress: false,
    teamHome: {
      teamName: 'Palmeiras',
    },
    teamAway: {
      teamName: 'Ferroviária',
    },
  },
];

export const matchesInProgressTrue = [
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Internacional',
    },
  },
  {
    id: 42,
    homeTeam: 6,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'Ferroviária',
    },
    teamAway: {
      teamName: 'Avaí/Kindermann',
    },
  },
  {
    id: 43,
    homeTeam: 11,
    homeTeamGoals: 0,
    awayTeam: 10,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'Napoli-SC',
    },
    teamAway: {
      teamName: 'Minas Brasília',
    },
  },
];

export const matchesInProgressFalse = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Internacional',
    },
    teamAway: {
      teamName: 'Santos',
    },
  },
  {
    id: 3,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: 'Corinthians',
    },
    teamAway: {
      teamName: 'Napoli-SC',
    },
  },
];

export const updatedMatchResult = [
  {
    id: 48,
    homeTeam: 13,
    homeTeamGoals: 3,
    awayTeam: 2,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: 'Real Brasília',
    },
    teamAway: {
      teamName: 'Bahia',
    },
  },
];

export const saveMatchBody = {
  "homeTeam": 6,
  "awayTeam": 8, 
  "homeTeamGoals": 3,
  "awayTeamGoals": 2
}

export const saveMatch = {
	"id": 50,
	"homeTeam": 6,
	"awayTeam": 8,
	"homeTeamGoals": 3,
	"awayTeamGoals": 2,
	"inProgress": true
}

export const updatedMatch = [
	{
		"id": 48,
		"homeTeam": 13,
		"homeTeamGoals": 3,
		"awayTeam": 2,
		"awayTeamGoals": 1,
		"inProgress": true,
		"teamHome": {
			"teamName": "Real Brasília"
		},
		"teamAway": {
			"teamName": "Bahia"
		}
	}
];

export const updateMatchBody = {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}

export interface IMatchesMock extends Match {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: {
    teamName: string;
  };
  teamAway?: {
    teamName: string;
  };
}
