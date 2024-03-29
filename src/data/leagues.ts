import { League } from '../interfaces/poe.interfaces';

/**
 * Fetched manually from api.pathofexile.com/league until I have a OAuth access.
 */
export const leagues: League[] = [
  {
    id: 'Scourge',
    realm: 'pc',
    url: 'https://www.pathofexile.com/forum/view-thread/3188271',
    startAt: '2021-10-22T19:00:00Z',
    endAt: '2025-12-07T22:00:00Z',
    description:
      'Defeat The Scourge in an alternate Wraeclast to create powerful corrupted items.\n\nThis is the default Path of Exile league.',
    registerAt: '2021-10-22T16:30:00Z',
    delveEvent: true,
    rules: [],
  },
  {
    id: 'Hardcore Scourge',
    realm: 'pc',
    url: 'https://www.pathofexile.com/forum/view-thread/3188272',
    startAt: '2021-10-22T19:00:00Z',
    endAt: '2025-12-07T22:00:00Z',
    description:
      'Defeat The Scourge in an alternate Wraeclast to create powerful corrupted items.\n\nA character killed in Hardcore Scourge becomes a Standard character.',
    registerAt: '2021-10-22T16:30:00Z',
    delveEvent: true,
    rules: [
      {
        id: 'Hardcore',
        name: 'Hardcore',
        description: 'A character killed in Hardcore is moved to its parent league.',
      },
    ],
  },
  {
    id: 'Standard',
    realm: 'pc',
    url: 'https://www.pathofexile.com/forum/view-thread/71278',
    startAt: '2013-01-23T21:00:00Z',
    endAt: null,
    description: 'The default game mode.',
    registerAt: '2019-09-06T19:00:00Z',
    delveEvent: true,
    rules: [],
  },
  {
    id: 'Hardcore',
    realm: 'pc',
    url: 'https://www.pathofexile.com/forum/view-thread/71276',
    startAt: '2013-01-23T21:00:00Z',
    endAt: null,
    description: 'A character killed in the Hardcore league is moved to the Standard league.',
    registerAt: '2019-09-06T19:00:00Z',
    delveEvent: true,
    rules: [
      {
        id: 'Hardcore',
        name: 'Hardcore',
        description: 'A character killed in Hardcore is moved to its parent league.',
      },
    ],
  },
];
