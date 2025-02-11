interface AvatarData {
  filename: string;
  characterName: string;
}

export const AVATAR_DATA: AvatarData[] = [
  { filename: 'homer_simpson.png', characterName: 'Homer Simpson' },
  { filename: 'marge_simpson.png', characterName: 'Marge Simpson' },
  { filename: 'bart_simpson.png', characterName: 'Bart Simpson' },
  { filename: 'lisa_simpson.png', characterName: 'Lisa Simpson' },
  { filename: 'maggie_simpson.png', characterName: 'Maggie Simpson' },
  { filename: 'ned_flanders.png', characterName: 'Ned Flanders' },
  { filename: 'mr_burns.png', characterName: 'Charles Montgomery Burns' },
  { filename: 'apu_nahasapeemapetilon.png', characterName: 'Apu Nahasapeemapetilon' },
  { filename: 'moe_szyslak.png', characterName: 'Moe Szyslak' },
  { filename: 'chief_wiggum.png', characterName: 'Chief Clancy Wiggum' },
  { filename: 'ralph_wiggum.png', characterName: 'Ralph Wiggum' },
  { filename: 'milhouse_van_houten.png', characterName: 'Milhouse Van Houten' }
];

export const AVATARS = AVATAR_DATA.map(data => data.filename); 