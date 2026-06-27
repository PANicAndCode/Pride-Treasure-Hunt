const COOLDOWN_MINUTES = 10;
const BASE_HINTS = 3;
const SITE_NAME = "Pride Hunt";
const STORAGE_PREFIX = "pride-hunt-v1";
const REMEMBERED_TEAM_KEY = `${STORAGE_PREFIX}-remembered-team`;
const REMEMBERED_TEAM_STARTED_KEY = `${STORAGE_PREFIX}-remembered-team-started`;
const REMEMBERED_PLAYER_PROFILE_KEY = `${STORAGE_PREFIX}-remembered-player-profile`;
const REMEMBERED_MEMBER_ID_KEY = `${STORAGE_PREFIX}-remembered-member-id`;
const ADMIN_PASSCODE = "pridehost";
const TEAM_IDENTITY_SEPARATOR = "|||";
const DEFAULT_MASCOT = "rabbit";
const MASCOTS = {
  rabbit: { label: "Rabbits", emoji: "🐰", badgeClass: "mascot-rabbit", title: "Joy Sprint", flavor: "Bright starts, fast clues, and high-energy celebrations." },
  knight: { label: "Knights", emoji: "🛡️", badgeClass: "mascot-knight", title: "Proud Guard", flavor: "Steady focus, brave scans, and resilient finishes." },
  raven: { label: "Ravens", emoji: "🪶", badgeClass: "mascot-raven", title: "Afterglow Watch", flavor: "Sharp reads, bold turns, and graceful steals." },
  wolf: { label: "Wolves", emoji: "🐺", badgeClass: "mascot-wolf", title: "Chosen Pack", flavor: "Move together, protect the pace, and run fearless." },
  fox: { label: "Foxes", emoji: "🦊", badgeClass: "mascot-fox", title: "Glowtrail Crew", flavor: "Quick pivots, colorful flair, and clever route wins." },
  cobra: { label: "Cobras", emoji: "🐍", badgeClass: "mascot-cobra", title: "Neon Strike", flavor: "Patient reads, perfect timing, and clean rainbow finishes." }
};
const PRIDE_FLAGS = Object.freeze([
  { key: "progress", label: "Progress", aliases: ["inclusive", "lgbtq+", "progress pride"], background: "linear-gradient(135deg,#111 0 10%,#613915 10% 18%,#5bcffb 18% 30%,#f5abb9 30% 42%,#fff 42% 54%,#f5abb9 54% 66%,#5bcffb 66% 78%,#613915 78% 86%,#111 86% 92%,#e40303 92% 100%)" },
  { key: "rainbow", label: "Rainbow Pride", aliases: ["classic pride", "gay pride", "lgbt"], background: "linear-gradient(180deg,#e40303 0 16%,#ff8c00 16% 32%,#ffed00 32% 48%,#008026 48% 64%,#24408e 64% 80%,#732982 80%)" },
  { key: "ally", label: "Ally", aliases: ["straight ally", "ally pride"], background: "linear-gradient(90deg,#111 0 24%,#fff 24% 36%,#111 36% 48%,#fff 48% 60%,#111 60% 72%,#fff 72% 84%,#111 84%), linear-gradient(180deg,transparent 0 22%,#e40303 22% 34%,#ff8c00 34% 46%,#ffed00 46% 58%,#008026 58% 70%,#24408e 70% 82%,#732982 82%)" },
  { key: "lesbian", label: "Lesbian", aliases: ["wlw"], background: "linear-gradient(180deg,#d62900 0 20%,#ff9b55 20% 40%,#fff 40% 60%,#d462a6 60% 80%,#a50062 80%)" },
  { key: "gaymen", label: "Gay Men", aliases: ["mlm", "men loving men"], background: "linear-gradient(180deg,#078d70 0 20%,#26ceaa 20% 40%,#98e8c1 40% 52%,#7bade2 52% 72%,#5049cc 72%)" },
  { key: "bi", label: "Bisexual", aliases: ["bisexuality"], background: "linear-gradient(180deg,#d60270 0 40%,#9b4f96 40% 60%,#0038a8 60%)" },
  { key: "pan", label: "Pansexual", aliases: ["pan"], background: "linear-gradient(180deg,#ff1b8d 0 33%,#ffd900 33% 66%,#1bb3ff 66%)" },
  { key: "omni", label: "Omnisexual", aliases: ["omni"], background: "linear-gradient(180deg,#ff9ad5 0 24%,#ff53bf 24% 48%,#220244 48% 68%,#6755ff 68% 84%,#8bd4ff 84%)" },
  { key: "polysexual", label: "Polysexual", aliases: ["polysexuality"], background: "linear-gradient(180deg,#f61cb9 0 33%,#07d569 33% 66%,#1c92f6 66%)" },
  { key: "abrosexual", label: "Abrosexual", aliases: ["abro"], background: "linear-gradient(180deg,#75ca92 0 20%,#b2e4c5 20% 40%,#fff 40% 60%,#e695b5 60% 80%,#d9446b 80%)" },
  { key: "asexual", label: "Asexual", aliases: ["ace"], background: "linear-gradient(180deg,#111 0 25%,#a6a6a6 25% 50%,#fff 50% 75%,#7a007a 75%)" },
  { key: "graysexual", label: "Graysexual", aliases: ["gray ace", "greysexual", "gray-asexual"], background: "linear-gradient(180deg,#6f258d 0 22%,#b7b7b7 22% 44%,#fff 44% 66%,#b7b7b7 66% 84%,#6f258d 84%)" },
  { key: "demisexual", label: "Demisexual", aliases: ["demi ace"], background: "linear-gradient(120deg,#111 0 18%,transparent 18%), linear-gradient(180deg,#fff 0 30%,#7f7f7f 30% 58%,#7a007a 58%)" },
  { key: "aromantic", label: "Aromantic", aliases: ["aro"], background: "linear-gradient(180deg,#3aa63f 0 20%,#a8d47a 20% 40%,#fff 40% 60%,#ababab 60% 80%,#111 80%)" },
  { key: "grayromantic", label: "Grayromantic", aliases: ["greyromantic", "gray aro"], background: "linear-gradient(180deg,#2f8f40 0 22%,#a8d47a 22% 44%,#fff 44% 66%,#b4b4b4 66% 84%,#111 84%)" },
  { key: "demiromantic", label: "Demiromantic", aliases: ["demi aro"], background: "linear-gradient(120deg,#111 0 18%,transparent 18%), linear-gradient(180deg,#fff 0 30%,#a8d47a 30% 58%,#3aa63f 58%)" },
  { key: "aroace", label: "Aroace", aliases: ["aromantic asexual"], background: "linear-gradient(180deg,#e28c00 0 20%,#eccd00 20% 40%,#fff 40% 60%,#62aedc 60% 80%,#203856 80%)" },
  { key: "queer", label: "Queer", aliases: ["queer pride"], background: "linear-gradient(180deg,#000 0 20%,#9ad9ea 20% 40%,#fff 40% 60%,#f7a8b8 60% 80%,#6b1b62 80%)" },
  { key: "questioning", label: "Questioning", aliases: ["unsure", "exploring"], background: "linear-gradient(180deg,#5a388f 0 20%,#8460c4 20% 40%,#fff 40% 60%,#a6e1fa 60% 80%,#4fb3d9 80%)" },
  { key: "trans", label: "Transgender", aliases: ["trans"], background: "linear-gradient(180deg,#5bcffb 0 20%,#f5abb9 20% 40%,#fff 40% 60%,#f5abb9 60% 80%,#5bcffb 80%)" },
  { key: "nonbinary", label: "Nonbinary", aliases: ["nb", "enby"], background: "linear-gradient(180deg,#fcf434 0 25%,#fff 25% 50%,#9c59d1 50% 75%,#2f2f2f 75%)" },
  { key: "genderqueer", label: "Genderqueer", aliases: ["gq"], background: "linear-gradient(180deg,#b57edc 0 33%,#fff 33% 66%,#4a8123 66%)" },
  { key: "genderfluid", label: "Genderfluid", aliases: ["gf"], background: "linear-gradient(180deg,#ff75a2 0 20%,#fff 20% 40%,#be18d6 40% 60%,#111 60% 80%,#333ebd 80%)" },
  { key: "genderflux", label: "Genderflux", aliases: ["gf flux"], background: "linear-gradient(180deg,#f47694 0 18%,#f2a2b9 18% 36%,#c7c7c7 36% 54%,#7ce0f7 54% 72%,#3ecdf9 72% 88%,#fff 88%)" },
  { key: "agender", label: "Agender", aliases: ["agender pride"], background: "linear-gradient(180deg,#111 0 16%,#b9b9b9 16% 32%,#fff 32% 48%,#b8f483 48% 64%,#fff 64% 80%,#b9b9b9 80% 100%)" },
  { key: "bigender", label: "Bigender", aliases: ["bi gender"], background: "linear-gradient(180deg,#c479a2 0 16%,#eda5cd 16% 32%,#d6c7e8 32% 48%,#fff 48% 64%,#d6c7e8 64% 80%,#9ac7e8 80% 90%,#6d82d1 90%)" },
  { key: "pangender", label: "Pangender", aliases: ["all genders"], background: "linear-gradient(180deg,#fff798 0 20%,#feddcc 20% 40%,#ffebfb 40% 60%,#fff 60% 80%,#ffebfb 80%)" },
  { key: "demiboy", label: "Demiboy", aliases: ["demi boy"], background: "linear-gradient(180deg,#7f7f7f 0 14%,#c4c4c4 14% 28%,#9ad9eb 28% 42%,#fff 42% 56%,#9ad9eb 56% 70%,#c4c4c4 70% 84%,#7f7f7f 84%)" },
  { key: "demigirl", label: "Demigirl", aliases: ["demi girl"], background: "linear-gradient(180deg,#7f7f7f 0 14%,#c4c4c4 14% 28%,#f7c1d9 28% 42%,#fff 42% 56%,#f7c1d9 56% 70%,#c4c4c4 70% 84%,#7f7f7f 84%)" },
  { key: "androgyne", label: "Androgyne", aliases: ["androgynous"], background: "linear-gradient(180deg,#fe007f 0 33%,#9832ff 33% 66%,#00b8e7 66%)" },
  { key: "neutrois", label: "Neutrois", aliases: ["neutral gender"], background: "linear-gradient(180deg,#fff 0 33%,#1a1a1a 33% 66%,#32cc32 66%)" },
  { key: "intersex", label: "Intersex", aliases: ["intersex pride"], background: "radial-gradient(circle at center, transparent 0 25%, #7a01aa 25% 35%, transparent 35%), linear-gradient(180deg,#ffd800,#ffd800)" },
  { key: "twospirit", label: "Two-Spirit", aliases: ["2s", "two spirit"], background: "linear-gradient(180deg,#d51d00 0 20%,#ff9a56 20% 40%,#ffd787 40% 60%,#6bd16b 60% 80%,#1976d2 80%)" },
  { key: "xenogender", label: "Xenogender", aliases: ["xeno"], background: "linear-gradient(180deg,#ff8ec7 0 20%,#ffb5d8 20% 40%,#fff 40% 60%,#b7f7f1 60% 80%,#6ce7dc 80%)" },
  { key: "aceflux", label: "Aceflux", aliases: ["ace flux"], background: "linear-gradient(180deg,#7a007a 0 20%,#a6a6a6 20% 40%,#fff 40% 60%,#cfcfcf 60% 80%,#8cd5f5 80%)" },
  { key: "aroflux", label: "Aroflux", aliases: ["aro flux"], background: "linear-gradient(180deg,#3aa63f 0 20%,#6bcf6f 20% 40%,#b6f3b7 40% 60%,#fff 60% 80%,#a8d47a 80%)" },
  { key: "sapphic", label: "Sapphic", aliases: ["women loving women"], background: "linear-gradient(180deg,#fc94be 0 20%,#ffccd9 20% 40%,#fff 40% 60%,#c79cff 60% 80%,#5b3f94 80%)" },
  { key: "achillean", label: "Achillean", aliases: ["men loving men pride"], background: "linear-gradient(180deg,#4ec5b2 0 20%,#c5f4d6 20% 40%,#fff 40% 60%,#7cc0ef 60% 80%,#2f5890 80%)" },
  { key: "polyamory", label: "Polyamory", aliases: ["polyam"], background: "linear-gradient(180deg,#0000ff 0 33%,#ff0000 33% 66%,#111 66%), radial-gradient(circle at center, #ffd700 0 18%, transparent 18%)" }
]);
const PRIDE_FLAG_MAP = Object.freeze(PRIDE_FLAGS.reduce((acc, flag) => {
  acc[flag.key] = flag;
  return acc;
}, {}));
const PRIDE_FLAG_ALIAS_MAP = Object.freeze((() => {
  const map = {};
  PRIDE_FLAGS.forEach(flag => {
    [flag.key, flag.label, ...(flag.aliases || [])].forEach(alias => {
      map[normalizeTeamName(alias)] = flag.key;
    });
  });
  return map;
})());
const DEFAULT_PRIDE_FLAG_KEYS = Object.freeze(["progress"]);
const DECORATIVE_FLAG_KEYS = Object.freeze(PRIDE_FLAGS.map(flag => flag.key));
const MAP_ENABLED_KEY = `${STORAGE_PREFIX}-map-enabled`;
const GAME_PRESETS_KEY = `${STORAGE_PREFIX}-game-presets`;
const ACTIVE_GAME_PRESET_KEY = `${STORAGE_PREFIX}-active-game-preset`;
const LEADERBOARD_TABLE = "leaderboard_pride_hunt";
const PROGRESS_TABLE = "team_progress_pride_hunt";
const GAME_PRESETS_TABLE = "game_presets_pride_hunt";
const SHARED_SETTINGS_TEAM_ID = "__settings__";
const FINAL_CLUE_ID = 11;
const MISSION_OVERLAY_AUTO_HIDE_MS = 4500;
const DEFAULT_GAME_PRESET_ID = "preset-default";
const DEFAULT_GAME_PRESET_NAME = "Default Pride Hunt";
const LEGACY_TEAMS = typeof TEAMS === "object" ? TEAMS : {};
const CLUE_IDS = Object.keys(CLUES).map(Number).sort((a, b) => a - b);
const ROUTE_CLUE_IDS = CLUE_IDS.filter(id => id !== FINAL_CLUE_ID);
const DEFAULT_CLUES = JSON.parse(JSON.stringify(CLUES));
const CLUE_TOKEN_BY_ID = Object.freeze((() => {
  const tokenMap = {};
  Object.entries(LEGACY_TEAMS).forEach(([team, meta]) => {
    (meta.sequence || []).forEach((clueId, idx) => {
      const token = TOKENS?.[team]?.[idx];
      if (token && !tokenMap[clueId]) tokenMap[clueId] = token;
    });
  });
  return tokenMap;
})());

let teamKey = null;
let state = null;
let now = Date.now();
let supabaseReady = false;
let supabaseClient = null;
let liveBoardCache = {};
let liveProgressCache = {};
let fileQrScanner = null;
let cameraStream = null;
let capturedCanvas = null;
let mapEnabled = localMapEnabled();
let syncState = "pending";
let syncMessage = "Connecting to shared game...";
let sharedActivities = [];
let sharedDataPrimed = false;
let audioContext = null;
let gateMode = "join";
let gateStage = "team";
let gateProfileTarget = null;
let playerProfile = loadRememberedPlayerProfile();
let gamePresetsCache = {};
let activeGamePresetId = DEFAULT_GAME_PRESET_ID;
let gamePresetStorageReady = false;
let missionOverlayTimer = null;

function el(id){ return document.getElementById(id); }
function storageKey(team){ return `${STORAGE_PREFIX}-${team}`; }
function leaderboardKey(){ return `${STORAGE_PREFIX}-leaderboard`; }
function teamExists(team){ return !!team && team !== SHARED_SETTINGS_TEAM_ID; }
function teamFallbackLabel(team){ return LEGACY_TEAMS[team]?.label || "Team"; }
function clueTokenForId(clueId){ return CLUE_TOKEN_BY_ID[Number(clueId)] || null; }
function clueIdForToken(token){
  const trimmed = String(token || "").trim();
  if (!trimmed) return null;
  const match = Object.entries(CLUE_TOKEN_BY_ID).find(([, value]) => value === trimmed);
  return match ? Number(match[0]) : null;
}
function shuffleList(values){
  const list = values.slice();
  for (let i = list.length - 1; i > 0; i -= 1){
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}
function generateRandomSequence(){
  return [...shuffleList(ROUTE_CLUE_IDS), FINAL_CLUE_ID];
}
function normalizeSequence(sequence){
  const raw = Array.isArray(sequence) ? sequence.map(Number).filter(id => CLUES[id]) : [];
  const used = new Set();
  const body = [];
  raw.forEach(id => {
    if (id === FINAL_CLUE_ID) return;
    if (used.has(id)) return;
    used.add(id);
    body.push(id);
  });
  ROUTE_CLUE_IDS.forEach(id => {
    if (!used.has(id)) body.push(id);
  });
  return [...body, FINAL_CLUE_ID];
}
function sequenceForTeam(team = teamKey, targetState = state){
  if (targetState && Array.isArray(targetState.sequence) && targetState.sequence.length) return normalizeSequence(targetState.sequence);
  if (team && Array.isArray(LEGACY_TEAMS[team]?.sequence)) return normalizeSequence(LEGACY_TEAMS[team].sequence);
  return normalizeSequence(generateRandomSequence());
}
function expectedTokenForState(targetState = state, team = teamKey){
  const clueId = currentClueId(targetState, team);
  return clueId ? clueTokenForId(clueId) : null;
}
function generateTeamId(){
  if (window.crypto?.randomUUID) return `team-${window.crypto.randomUUID()}`;
  return `team-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function generateMemberId(){
  if (window.crypto?.randomUUID) return `member-${window.crypto.randomUUID()}`;
  return `member-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function normalizeTeamName(value){
  return String(value || "").trim().replace(/\s+/g, " ").toLowerCase();
}
function normalizeMemberName(value){
  return String(value || "").trim().replace(/\s+/g, " ");
}
function currentMemberId(){
  return String(localStorage.getItem(REMEMBERED_MEMBER_ID_KEY) || "").trim();
}
function ensureRememberedMemberId(){
  const existing = currentMemberId();
  if (existing) return existing;
  const created = generateMemberId();
  localStorage.setItem(REMEMBERED_MEMBER_ID_KEY, created);
  return created;
}
function clearRememberedMemberId(){
  localStorage.removeItem(REMEMBERED_MEMBER_ID_KEY);
}
function defaultPlayerProfile(profile = {}){
  return {
    name: normalizeMemberName(profile.name || ""),
    pronouns: normalizeMemberName(profile.pronouns || profile.pronoun || ""),
    flagKeys: normalizeFlagKeys(profile.flagKeys || profile.flag_keys || profile.flags || [])
  };
}
function loadRememberedPlayerProfile(){
  return defaultPlayerProfile(readJson(REMEMBERED_PLAYER_PROFILE_KEY, {}));
}
function saveRememberedPlayerProfile(profile = playerProfile){
  playerProfile = defaultPlayerProfile(profile);
  localStorage.setItem(REMEMBERED_PLAYER_PROFILE_KEY, JSON.stringify(playerProfile));
}
function clearRememberedPlayerProfile(){
  localStorage.removeItem(REMEMBERED_PLAYER_PROFILE_KEY);
  playerProfile = defaultPlayerProfile();
}
function profileHasName(profile = playerProfile){
  return !!normalizeMemberName(profile?.name);
}
function normalizeRosterMember(member = {}){
  const memberId = String(member.memberId || member.member_id || "").trim();
  if (!memberId) return null;
  return {
    memberId,
    name: normalizeMemberName(member.name || ""),
    pronouns: normalizeMemberName(member.pronouns || ""),
    flagKeys: normalizeFlagKeys(member.flagKeys || member.flag_keys || member.flags || []),
    joinedAt: Number(member.joinedAt || member.joined_at || 0) || 0,
    lastUpdatedAt: Number(member.lastUpdatedAt || member.last_updated_at || 0) || 0
  };
}
function normalizeTeamMembers(members){
  const seen = new Set();
  return (Array.isArray(members) ? members : []).map(normalizeRosterMember).filter(member => {
    if (!member || seen.has(member.memberId)) return false;
    seen.add(member.memberId);
    return true;
  }).sort((a, b) => {
    const aName = normalizeTeamName(a.name || "");
    const bName = normalizeTeamName(b.name || "");
    return aName.localeCompare(bName) || (Number(a.joinedAt || 0) - Number(b.joinedAt || 0)) || a.memberId.localeCompare(b.memberId);
  });
}
function memberDisplayName(member){
  return normalizeMemberName(member?.name) || "Unnamed player";
}
function memberLabelText(member){
  const name = memberDisplayName(member);
  return member?.pronouns ? `${name} (${member.pronouns})` : name;
}
function currentGatePlayerProfile(){
  return defaultPlayerProfile({
    name: el("gatePlayerName")?.value || "",
    pronouns: el("gatePlayerPronouns")?.value || "",
    flagKeys: selectedGateFlagKeys()
  });
}
function applyGatePlayerProfile(profile = playerProfile){
  const normalized = defaultPlayerProfile(profile);
  if (el("gatePlayerName")) el("gatePlayerName").value = normalized.name;
  if (el("gatePlayerPronouns")) el("gatePlayerPronouns").value = normalized.pronouns;
  populateFlagOptions(normalized.flagKeys);
}
function memberFromProfile(profile = playerProfile, memberId = currentMemberId() || "preview-member", joinedAt = Date.now()){
  return normalizeRosterMember({
    memberId,
    name: profile.name,
    pronouns: profile.pronouns,
    flagKeys: profile.flagKeys,
    joinedAt,
    lastUpdatedAt: Date.now()
  });
}
function teamMembersForState(targetState = state){
  return normalizeTeamMembers(targetState?.members || []);
}
function currentTeamMember(targetState = state){
  const members = teamMembersForState(targetState);
  const memberId = currentMemberId();
  if (memberId){
    const exact = members.find(member => member.memberId === memberId);
    if (exact) return exact;
  }
  return profileHasName(playerProfile) ? memberFromProfile(playerProfile) : null;
}
function upsertMemberInState(targetState, profile = playerProfile, memberId = ensureRememberedMemberId()){
  if (!targetState) return [];
  const existing = teamMembersForState(targetState).find(member => member.memberId === memberId);
  const nextMember = memberFromProfile(profile, memberId, existing?.joinedAt || Date.now());
  targetState.members = normalizeTeamMembers([
    ...teamMembersForState(targetState).filter(member => member.memberId !== memberId),
    nextMember
  ]);
  return targetState.members;
}
function removeMemberFromState(targetState, memberId = currentMemberId()){
  if (!targetState || !memberId) return [];
  targetState.members = teamMembersForState(targetState).filter(member => member.memberId !== memberId);
  return targetState.members;
}
function memberProfileMarkup(member, opts = {}){
  if (!member) return "";
  const compactClass = opts.compact ? " compact" : "";
  const flags = member.flagKeys?.length ? `<div class="identityBadges memberFlagBadges">${member.flagKeys.map(flag => flagChipMarkup(flag, { compact: true })).join("")}</div>` : "";
  return `<div class="memberCard${compactClass}"><div class="memberHeading"><strong>${escapeHtml(memberDisplayName(member))}</strong>${member.pronouns ? `<span class="memberPronouns">${escapeHtml(member.pronouns)}</span>` : ""}</div>${flags}</div>`;
}
function memberRosterMarkup(members, opts = {}){
  const normalized = normalizeTeamMembers(members);
  if (!normalized.length) return opts.emptyText ? `<div class="small memberRosterEmpty">${escapeHtml(opts.emptyText)}</div>` : "";
  const limit = Number.isFinite(opts.limit) ? opts.limit : normalized.length;
  const cards = normalized.slice(0, limit).map(member => memberProfileMarkup(member, { compact: !!opts.compact })).join("");
  const more = normalized.length > limit ? `<div class="small memberRosterMore">+${normalized.length - limit} more</div>` : "";
  return `<div class="memberRoster${opts.compact ? " compact" : ""}">${cards}${more}</div>`;
}
function teamRosterCountText(members){
  const count = normalizeTeamMembers(members).length;
  if (!count) return "No players yet";
  return `${count} ${count === 1 ? "player" : "players"}`;
}
function allKnownTeamIds(){
  const ids = new Set();
  Object.keys(readJson(leaderboardKey(), {})).forEach(id => { if (teamExists(id)) ids.add(id); });
  Object.keys(liveBoardCache || {}).forEach(id => { if (teamExists(id)) ids.add(id); });
  Object.keys(liveProgressCache || {}).forEach(id => { if (teamExists(id)) ids.add(id); });
  if (teamExists(teamKey)) ids.add(teamKey);
  const remembered = localStorage.getItem(REMEMBERED_TEAM_KEY);
  if (teamExists(remembered)) ids.add(remembered);
  return [...ids];
}
function cachedBoardState(team){
  const board = readJson(leaderboardKey(), {});
  return liveBoardCache[team] || board[team] || null;
}
function progressStateFor(team){
  if (!teamExists(team)) return null;
  if (team === teamKey && state) return state;
  return liveProgressCache[team] || loadLocalState(team);
}
function cachedRawTeamName(team){
  const progress = progressStateFor(team);
  const board = cachedBoardState(team);
  return progress?.teamName || board?.team_name || board?.teamName || null;
}
function isCreatedTeamState(targetState, team, rawName = targetState?.teamName){
  if (!teamExists(team)) return false;
  const identity = teamIdentity(rawName || teamFallbackLabel(team), team);
  return Number(targetState?.startedAt || 0) > 0
    || Number(targetState?.lastUpdatedAt || 0) > 0
    || Number(targetState?.progressIndex || 0) > 0
    || !!targetState?.finished
    || teamMembersForState(targetState).length > 0
    || (Array.isArray(targetState?.completed) && targetState.completed.length > 0)
    || normalizeTeamName(identity.displayName) !== normalizeTeamName(teamFallbackLabel(team));
}
function visibleTeamIds(){
  return allKnownTeamIds().filter(team => {
    const progress = progressStateFor(team);
    const board = cachedBoardState(team);
    const rawName = progress?.teamName || board?.team_name || board?.teamName || teamFallbackLabel(team);
    const found = Number(board?.found || progress?.completed?.length || 0);
    return isCreatedTeamState(progress, team, rawName) || found > 0 || !!board?.finished || !!progress?.finished;
  });
}
function teamLabelText(team, targetState = progressStateFor(team)){
  return teamIdentity(targetState?.teamName || cachedRawTeamName(team) || teamFallbackLabel(team), team).displayName;
}
function rememberedTeamRecord(){
  const saved = localStorage.getItem(REMEMBERED_TEAM_KEY);
  if (!teamExists(saved)) return null;
  const startedRaw = localStorage.getItem(REMEMBERED_TEAM_STARTED_KEY);
  return { team: saved, startedAt: startedRaw ? Number(startedRaw) : 0 };
}
function rememberedTeam(){
  return rememberedTeamRecord()?.team || null;
}
function rememberTeam(team, startedAt){
  if (!teamExists(team)) return;
  localStorage.setItem(REMEMBERED_TEAM_KEY, team);
  localStorage.setItem(REMEMBERED_TEAM_STARTED_KEY, String(Number(startedAt) || 0));
}
function clearRememberedTeam(team){
  const saved = localStorage.getItem(REMEMBERED_TEAM_KEY);
  if (!team || saved === team){
    localStorage.removeItem(REMEMBERED_TEAM_KEY);
    localStorage.removeItem(REMEMBERED_TEAM_STARTED_KEY);
  }
}
function releaseTeamSelection(message){
  clearRememberedTeam();
  clearRememberedPlayerProfile();
  clearRememberedMemberId();
  teamKey = null;
  state = null;
  gateMode = "join";
  gateStage = "team";
  gateProfileTarget = null;
  stopCamera();
  hideAdminOverlay();
  hideAdminPanel();
  hideVictoryOverlay();
  hideMissionOverlay();
  applyTeamTheme(encodeTeamIdentity(SITE_NAME, DEFAULT_MASCOT, SITE_NAME), null);
  if (el("teamGate")) el("teamGate").classList.remove("hidden");
  setGateMode("join");
  renderGateTeams(null);
  populateMascotOptions();
  applyGatePlayerProfile(playerProfile);
  if (el("gateTeamName")) el("gateTeamName").value = "";
  setScanInsight();
  renderDeviceState();
  if (message) setFeedback(message, "warn");
}

async function leaveThisDevice(){
  if (!rememberedTeam() && !teamKey && !state) return;
  if (!window.confirm("Clear this device's saved team and make it ready for a new squad?")) return;
  const activeTeam = teamKey || rememberedTeam();
  const memberId = currentMemberId();
  if (teamExists(activeTeam) && memberId){
    const targetState = (activeTeam === teamKey && state) ? { ...state } : (await loadRemoteProgress(activeTeam) || loadLocalState(activeTeam));
    if (targetState){
      removeMemberFromState(targetState, memberId);
      if (!targetState.finished) targetState.lastUpdatedAt = Date.now();
      await upsertSharedTeamState(activeTeam, targetState);
    }
  }
  releaseTeamSelection("This device is ready for a different team.");
}
function clueStatusForTeam(team){
  const progress = liveProgressCache[team] || loadLocalState(team);
  if (!progress) return "Not started";
  if (progress.finished) return `Finished in ${formatDuration(completionTimeMsForState(progress))}`;
  const clueId = currentClueId(progress, team);
  if (!clueId) return "Finished";
  return `On clue ${progress.progressIndex + 1}: ${CLUES[clueId]?.location || `Clue ${clueId}`}`;
}
function toMillis(value){
  if (value == null || value === "") return 0;
  if (typeof value === "number") return value;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function finishedAtForState(targetState = state){
  if (!targetState) return 0;
  const direct = Number(targetState.completedAt || targetState.finishedAt || 0);
  if (direct > 0) return direct;
  return targetState.finished ? toMillis(targetState.lastUpdatedAt) : 0;
}

function completionTimeMsForState(targetState = state){
  if (!targetState) return 0;
  const direct = Number(targetState.completionTimeMs || 0);
  if (direct > 0) return direct;
  const started = Number(targetState.startedAt || 0);
  const finishedAt = finishedAtForState(targetState);
  if (started > 0 && finishedAt > 0) return Math.max(0, finishedAt - started);
  return 0;
}

function elapsedTimeMsForState(targetState = state, referenceNow = now){
  if (!targetState) return 0;
  if (targetState.finished) return completionTimeMsForState(targetState);
  const started = Number(targetState.startedAt || 0);
  if (started <= 0) return 0;
  return Math.max(0, Number(referenceNow || Date.now()) - started);
}

function formatDuration(value){
  const totalSeconds = Math.max(0, Math.round(Number(value || 0) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function hintStats(targetState = state){
  const usedRaw = Number(targetState?.usedHints || 0);
  const total = BASE_HINTS + Math.max(0, -usedRaw);
  const remaining = Math.max(0, BASE_HINTS - usedRaw);
  const usedDisplay = Math.max(0, total - remaining);
  return { usedRaw, usedDisplay, total, remaining };
}

function revealedHintForClue(targetState = state, team = teamKey){
  const activeId = currentClueId(targetState, team);
  return !!(activeId && targetState && Number(targetState.revealedHintClueId) === Number(activeId));
}

function currentClueId(targetState = state, team = teamKey){
  if (!team || !targetState) return null;
  const sequence = sequenceForTeam(team, targetState);
  return sequence[targetState.progressIndex] || null;
}

function clueAllowsHint(clueId){
  const clue = clueId ? CLUES[clueId] : null;
  return !!(clue && clue.hint && !clue.noHint);
}

function cloneClueValue(value){
  return JSON.parse(JSON.stringify(value));
}

function presetId(){
  if (window.crypto?.randomUUID) return `preset-${window.crypto.randomUUID()}`;
  return `preset-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function defaultPresetClues(){
  return cloneClueValue(DEFAULT_CLUES);
}

function normalizePresetClues(source){
  const normalized = {};
  CLUE_IDS.forEach(id => {
    const key = String(id);
    const fallback = DEFAULT_CLUES[key] || {};
    const incoming = source?.[key] || source?.[id] || {};
    normalized[key] = {
      title: String(incoming.title || fallback.title || `Clue ${id}`).trim() || String(fallback.title || `Clue ${id}`),
      location: String(incoming.location || fallback.location || `Checkpoint ${id}`).trim() || String(fallback.location || `Checkpoint ${id}`),
      hint: String(incoming.hint || fallback.hint || "").trim() || String(fallback.hint || ""),
      zone: cloneClueValue(fallback.zone || incoming.zone || {}),
      noHint: id === FINAL_CLUE_ID ? true : !!fallback.noHint
    };
  });
  return normalized;
}

function normalizePresetRecord(record = {}, fallbackId = DEFAULT_GAME_PRESET_ID){
  const presetIdValue = String(record.presetId || record.preset_id || fallbackId || DEFAULT_GAME_PRESET_ID).trim() || DEFAULT_GAME_PRESET_ID;
  const presetNameValue = String(record.presetName || record.preset_name || DEFAULT_GAME_PRESET_NAME).trim() || DEFAULT_GAME_PRESET_NAME;
  return {
    presetId: presetIdValue,
    presetName: presetNameValue,
    clues: normalizePresetClues(record.clues),
    isActive: !!record.isActive || !!record.is_active,
    createdAt: Number(record.createdAt || record.created_at || Date.now() || 0),
    updatedAt: Number(record.updatedAt || record.updated_at || Date.now() || 0)
  };
}

function defaultPresetRecord(){
  return normalizePresetRecord({
    presetId: DEFAULT_GAME_PRESET_ID,
    presetName: DEFAULT_GAME_PRESET_NAME,
    clues: defaultPresetClues(),
    isActive: true,
    createdAt: 0,
    updatedAt: 0
  });
}

function presetList(){
  return Object.values(gamePresetsCache).sort((a, b) => {
    if (a.presetId === activeGamePresetId && b.presetId !== activeGamePresetId) return -1;
    if (b.presetId === activeGamePresetId && a.presetId !== activeGamePresetId) return 1;
    if (a.presetId === DEFAULT_GAME_PRESET_ID && b.presetId !== DEFAULT_GAME_PRESET_ID) return -1;
    if (b.presetId === DEFAULT_GAME_PRESET_ID && a.presetId !== DEFAULT_GAME_PRESET_ID) return 1;
    return a.presetName.localeCompare(b.presetName);
  });
}

function presetById(presetIdValue){
  return gamePresetsCache[presetIdValue] || gamePresetsCache[DEFAULT_GAME_PRESET_ID] || defaultPresetRecord();
}

function saveLocalPresetCache(){
  const payload = {
    activePresetId: activeGamePresetId,
    presets: Object.values(gamePresetsCache).map(preset => ({
      presetId: preset.presetId,
      presetName: preset.presetName,
      clues: preset.clues,
      isActive: preset.presetId === activeGamePresetId,
      createdAt: preset.createdAt,
      updatedAt: preset.updatedAt
    }))
  };
  localStorage.setItem(GAME_PRESETS_KEY, JSON.stringify(payload));
  localStorage.setItem(ACTIVE_GAME_PRESET_KEY, activeGamePresetId);
}

function applyPresetClues(presetIdValue){
  const preset = presetById(presetIdValue);
  activeGamePresetId = preset.presetId;
  Object.values(gamePresetsCache).forEach(entry => {
    entry.isActive = entry.presetId === activeGamePresetId;
  });
  const clues = normalizePresetClues(preset.clues);
  Object.entries(clues).forEach(([key, clue]) => {
    CLUES[key] = {
      ...CLUES[key],
      ...clue,
      zone: cloneClueValue(DEFAULT_CLUES[key]?.zone || clue.zone || {}),
      noHint: Number(key) === FINAL_CLUE_ID ? true : !!clue.noHint
    };
  });
  saveLocalPresetCache();
}

function loadLocalPresetCache(){
  const stored = readJson(GAME_PRESETS_KEY, null);
  gamePresetsCache = { [DEFAULT_GAME_PRESET_ID]: defaultPresetRecord() };
  if (stored?.presets && Array.isArray(stored.presets)) {
    stored.presets.forEach(entry => {
      const normalized = normalizePresetRecord(entry);
      gamePresetsCache[normalized.presetId] = normalized;
    });
  }
  const activePreset = localStorage.getItem(ACTIVE_GAME_PRESET_KEY)
    || stored?.activePresetId
    || presetList().find(entry => entry.isActive)?.presetId
    || DEFAULT_GAME_PRESET_ID;
  applyPresetClues(activePreset);
}

function activePresetRecord(){
  return presetById(activeGamePresetId);
}

function renderAdminPresetStatus(){
  const status = el("adminPresetStatus");
  if (!status) return;
  const preset = activePresetRecord();
  status.textContent = `Active game: ${preset.presetName}`;
}

function escapeHtml(value){
  return String(value ?? "").replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
}

function normalizeMascotKey(key){
  return MASCOTS[key] ? key : DEFAULT_MASCOT;
}

function mascotMeta(key){
  return MASCOTS[normalizeMascotKey(key)];
}

function normalizeFlagKey(key){
  return PRIDE_FLAG_ALIAS_MAP[normalizeTeamName(key)] || null;
}

function normalizeFlagKeys(keys){
  const source = Array.isArray(keys) ? keys : String(keys || "").split(",");
  const selected = [];
  const seen = new Set();
  source.forEach(value => {
    const normalized = normalizeFlagKey(value);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    selected.push(normalized);
  });
  return selected;
}

function flagKeysOrDefault(keys){
  const normalized = normalizeFlagKeys(keys);
  return normalized.length ? normalized : DEFAULT_PRIDE_FLAG_KEYS.slice();
}

function prideFlagMeta(key){
  return PRIDE_FLAG_MAP[normalizeFlagKey(key)] || PRIDE_FLAG_MAP[DEFAULT_PRIDE_FLAG_KEYS[0]];
}

function flagSummaryText(keys, limit = 3){
  const labels = normalizeFlagKeys(keys).map(key => prideFlagMeta(key).label);
  if (!labels.length) return "No flags selected";
  if (labels.length <= limit) return labels.join(", ");
  return `${labels.slice(0, limit).join(", ")} +${labels.length - limit}`;
}

function flagChipMarkup(flagOrKey, opts = {}){
  const flag = typeof flagOrKey === "string" ? prideFlagMeta(flagOrKey) : flagOrKey;
  const compactClass = opts.compact ? " compact" : "";
  return `<span class="flagChip${compactClass}" style="--flag-bg:${flag.background}"><span>${escapeHtml(flag.label)}</span></span>`;
}

function identityFlagChipsMarkup(identity, opts = {}){
  const limit = Number.isFinite(opts.limit) ? opts.limit : 3;
  const flags = identity?.flags?.length ? identity.flags : flagKeysOrDefault(identity?.flagKeys).map(prideFlagMeta);
  const chips = flags.slice(0, limit).map(flag => flagChipMarkup(flag, { compact: opts.compact !== false }));
  if (flags.length > limit) chips.push(`<span class="flagMoreCount">+${flags.length - limit}</span>`);
  return chips.join("");
}

function identityBadgeStripMarkup(identity, opts = {}){
  if (!identity) return "";
  const pieces = [];
  if (!opts.skipMascot) pieces.push(mascotBadgeMarkup(identity, { showLabel: !!opts.showMascotLabel }));
  pieces.push(identityFlagChipsMarkup(identity, { limit: opts.flagLimit ?? 3, compact: opts.compact !== false }));
  return `<div class="identityBadges">${pieces.join("")}</div>`;
}

function selectedGateFlagKeys(){
  return normalizeFlagKeys(el("gateFlagValues")?.value || "");
}

function updateGateFlagSummary(selectedKeys = selectedGateFlagKeys()){
  const summary = el("gateFlagSummary");
  if (!summary) return;
  if (!selectedKeys.length){
    summary.textContent = "No flags selected yet.";
    return;
  }
  const count = selectedKeys.length;
  summary.textContent = `${count} ${count === 1 ? "flag" : "flags"} selected: ${flagSummaryText(selectedKeys, 4)}.`;
}

function renderDecorativeFlagShelf(id, keys){
  const mount = el(id);
  if (!mount) return;
  mount.innerHTML = keys.map(key => flagChipMarkup(key, { compact: true })).join("");
}

function populateDecorativeFlagShelves(){
  renderDecorativeFlagShelf("gateFlagShelf", DECORATIVE_FLAG_KEYS.slice(0, 16));
  renderDecorativeFlagShelf("heroFlagShelf", DECORATIVE_FLAG_KEYS);
}

function renderFlagCards(selectedKeys = selectedGateFlagKeys(), locked = false, filterText = el("gateFlagSearch")?.value || ""){
  const mount = el("gateFlagCards");
  if (!mount) return;
  const active = new Set(normalizeFlagKeys(selectedKeys));
  const query = normalizeTeamName(filterText || "");
  const matches = PRIDE_FLAGS.filter(flag => {
    if (!query) return true;
    return [flag.label, flag.key, ...(flag.aliases || [])].some(value => normalizeTeamName(value).includes(query));
  });
  mount.innerHTML = "";
  if (!matches.length){
    mount.innerHTML = `<div class="note">No identities matched that search yet.</div>`;
    return;
  }
  matches.forEach(flag => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `flagChoice${active.has(flag.key) ? " active" : ""}`;
    button.disabled = !!locked;
    button.setAttribute("aria-pressed", String(active.has(flag.key)));
    button.innerHTML = `${flagChipMarkup(flag, { compact: true })}<div class="flagChoiceCopy"><strong>${escapeHtml(flag.label)}</strong><small>${escapeHtml((flag.aliases || []).slice(0, 2).join(" • ") || "Pride identity")}</small></div>`;
    button.addEventListener("click", () => {
      if (locked) return;
      const next = active.has(flag.key)
        ? selectedGateFlagKeys().filter(key => key !== flag.key)
        : [...selectedGateFlagKeys(), flag.key];
      const hidden = el("gateFlagValues");
      if (hidden) hidden.value = normalizeFlagKeys(next).join(",");
      renderFlagCards(next, false, el("gateFlagSearch")?.value || "");
      updateGateFlagSummary(next);
      updateMascotPreview(el("gateMascotSelect")?.value || DEFAULT_MASCOT, next);
      renderDeviceState();
    });
    mount.appendChild(button);
  });
}

function populateFlagOptions(selected = [], locked = false, options = {}){
  const hidden = el("gateFlagValues");
  const search = el("gateFlagSearch");
  const normalized = normalizeFlagKeys(selected);
  if (hidden) hidden.value = normalized.join(",");
  if (search){
    search.disabled = !!locked;
    if (!options.preserveFilter) search.value = "";
    if (!search.dataset.flagSearchBound){
      search.addEventListener("input", () => renderFlagCards(selectedGateFlagKeys(), !!search.disabled, search.value));
      search.dataset.flagSearchBound = "true";
    }
  }
  renderFlagCards(normalized, locked, search?.value || "");
  updateGateFlagSummary(normalized);
}

function syncMessageForState(mode){
  if (mode === "live") return "Shared game live across devices.";
  if (mode === "local") return "Using this device only.";
  if (mode === "error") return "Shared sync hit a snag. Reconnecting...";
  return "Connecting to shared game...";
}

function setSyncState(mode, message){
  syncState = mode;
  syncMessage = message || syncMessageForState(mode);
  renderSyncBadge();
}

function renderSyncBadge(){
  const badge = el("syncBadge");
  if (badge){
    const classMap = {
      live: "syncLive",
      local: "syncLocal",
      error: "syncError",
      pending: "syncPending"
    };
    badge.className = `syncBadge ${classMap[syncState] || "syncPending"}`;
    badge.textContent = syncMessage || syncMessageForState(syncState);
  }
  const shared = el("sharedModeText");
  if (shared){
    shared.hidden = false;
    shared.style.display = "block";
    shared.textContent = syncMessage || syncMessageForState(syncState);
  }
}

function setScanInsight(message = "", tone = ""){
  const box = el("scanInsight");
  if (!box) return;
  box.className = `small scanInsight${tone ? ` ${tone}` : ""}`;
  box.textContent = message || "Wrong-scan tips and cross-team clues will show here.";
}

function pushSharedActivity(message){
  if (!message) return;
  if (sharedActivities[0]?.message === message) return;
  sharedActivities.unshift({ message, at: Date.now() });
  sharedActivities = sharedActivities.slice(0, 6);
  renderActivityTicker();
}

function renderActivityTicker(){
  const ticker = el("activityTicker");
  if (!ticker) return;
  ticker.textContent = sharedActivities[0]?.message || "Rival movement and admin updates will appear here.";
}

function gateProfileIdentity(){
  if (!gateProfileTarget) return null;
  const fallback = gateProfileTarget.teamId ? teamFallbackLabel(gateProfileTarget.teamId) : "Team";
  return parseTeamIdentity(gateProfileTarget.identityRaw || "", fallback);
}

function renderGateProfileTarget(){
  const mount = el("gateProfileTeamSummary");
  if (!mount) return;
  if (!gateProfileTarget){
    mount.innerHTML = "";
    return;
  }
  const identity = gateProfileIdentity();
  const roster = normalizeTeamMembers(gateProfileTarget.members || []);
  mount.innerHTML = `
    <div class="gateProfileTeamCard">
      ${mascotBadgeMarkup(identity, { showLabel: true })}
      <div>
        <strong>${escapeHtml(identity.displayName)}</strong>
        <div class="small">${escapeHtml(roster.length ? `${teamRosterCountText(roster)} already on this team.` : "You are adding the first player to this team.")}</div>
      </div>
    </div>
    ${memberRosterMarkup(roster, { compact: true, limit: 3, emptyText: "No one has joined this team yet." })}`;
}

function setGateStage(stage){
  gateStage = stage === "profile" ? "profile" : "team";
  if (el("gateTeamStage")) el("gateTeamStage").classList.toggle("hidden", gateStage !== "team");
  if (el("gateProfileStage")) el("gateProfileStage").classList.toggle("hidden", gateStage !== "profile");
  if (el("gateModeSwitch")) el("gateModeSwitch").classList.toggle("hidden", gateStage === "profile");
  if (el("gateBackBtn")) el("gateBackBtn").classList.toggle("hidden", gateStage !== "profile");
  if (el("startGameBtn")) el("startGameBtn").textContent = gateStage === "profile" ? "Start hunt" : "Continue";
  renderGateProfileTarget();
  updateGateSelectionStatus();
  renderDeviceState();
}

function openProfileStage(target){
  gateProfileTarget = target;
  applyGatePlayerProfile(playerProfile);
  renderGateProfileTarget();
  setGateStage("profile");
}

function updateThemePill(rawValue = state?.teamName, team = teamKey){
  const pill = el("teamThemePill");
  if (!pill){
    return;
  }
  if (!rawValue || !teamExists(team)){
    pill.className = "teamThemePill";
    pill.textContent = "Mascot theme waiting";
    return;
  }
  const identity = teamIdentity(rawValue, team);
  pill.className = `teamThemePill ${identity.mascot.badgeClass}`;
  pill.textContent = `${identity.mascot.emoji} ${identity.mascot.title}`;
}

function renderDeviceState(){
  const badge = el("deviceTeamBadge");
  const meta = el("deviceStatusMeta");
  const gateNote = el("gateDeviceNote");
  const remembered = rememberedTeam();
  const activeTeam = teamKey || remembered;
  const gateVisible = !!el("teamGate") && !el("teamGate").classList.contains("hidden");
  const rawValue = state?.teamName
    || (gateMode === "create" ? currentGateIdentityRaw() : null)
    || cachedRawTeamName(activeTeam)
    || (activeTeam ? encodeTeamIdentity(teamFallbackLabel(activeTeam), DEFAULT_MASCOT, teamFallbackLabel(activeTeam)) : null);
  const assigned = (!!remembered || (!!teamKey && !!state)) && !gateVisible;
  if (badge){
    if (!assigned){
      if (activeTeam && rawValue){
        const identity = teamIdentity(rawValue, activeTeam);
        badge.innerHTML = `${mascotBadgeMarkup(identity)} <span>Preview: ${escapeHtml(identity.displayName)}</span>`;
      } else {
        badge.textContent = "No team on this device";
      }
    } else {
      const identity = teamIdentity(rawValue, activeTeam);
      badge.innerHTML = `${mascotBadgeMarkup(identity)} <span>${escapeHtml(identity.displayName)}</span>`;
    }
  }
  if (meta){
    if (!assigned){
      if (gateStage === "profile" && gateProfileTarget){
        meta.textContent = "Add your player profile, then your name, pronouns, and flags will appear on the shared team roster.";
      } else if (activeTeam && gateMode === "join"){
        meta.textContent = `Ready to join ${teamIdentity(rawValue, activeTeam).displayName} on this device.`;
      } else {
        meta.textContent = gateMode === "create"
          ? "Create a team, choose a mascot, then continue to the player profile step."
          : "Join an existing team or create a new one.";
      }
    } else {
      const identity = teamIdentity(rawValue, activeTeam);
      const profileLine = profileHasName(playerProfile)
        ? `${memberLabelText(playerProfile)}${playerProfile.flagKeys.length ? ` • ${flagSummaryText(playerProfile.flagKeys, 2)}` : ""}. `
        : "";
      meta.textContent = `${profileLine}${identity.mascot.title}: ${identity.mascot.flavor}`;
    }
  }
  if (gateNote){
    if (assigned){
      gateNote.textContent = `This phone is carrying ${teamIdentity(rawValue, activeTeam).displayName}. Ask an admin if you need to leave this device.`;
    } else if (activeTeam && gateMode === "join"){
      gateNote.textContent = `Tap Join team to lock this device to ${teamIdentity(rawValue, activeTeam).displayName}.`;
    } else {
      gateNote.textContent = "This phone will remember its team after the first join. Only admin can clear it later, and each team's clock runs until the final QR.";
    }
  }
  ["adminLeaveDeviceBtn"].forEach(id => {
    const button = el(id);
    if (!button) return;
    button.classList.toggle("hidden", !assigned);
    button.classList.toggle("leaveDeviceActive", assigned);
  });
  updateThemePill(rawValue, activeTeam);
}

function updateGateSelectionStatus(locked = false, identity = parseTeamIdentity(currentGateIdentityRaw(), "Team")){
  const status = el("gateSelectionStatus");
  if (!status) return;
  if (gateStage === "profile"){
    const profileIdentity = gateProfileIdentity();
    status.textContent = profileIdentity
      ? `Add your player details for ${profileIdentity.displayName}. These show up on the shared roster.`
      : "Add your player details to finish joining.";
    return;
  }
  if (gateMode === "join"){
    status.textContent = teamKey
      ? `Join ${teamIdentity(cachedRawTeamName(teamKey) || teamFallbackLabel(teamKey), teamKey).displayName} on this device.`
      : "Choose an existing team to join.";
    return;
  }
  status.textContent = locked
    ? `${identity.displayName} is ready to create.`
    : "Create a team, pick a mascot, and continue to the player profile step.";
}

function renderMascotCards(selected = DEFAULT_MASCOT, locked = false){
  const mount = el("gateMascotCards");
  if (!mount) return;
  mount.innerHTML = "";
  Object.entries(MASCOTS).forEach(([key, mascot]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `mascotChoice ${mascot.badgeClass}${key === selected ? " active" : ""}`;
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", String(key === selected));
    button.disabled = !!locked;
    button.innerHTML = `<strong>${mascot.emoji} ${escapeHtml(mascot.label)}</strong><small>${escapeHtml(mascot.title)}. ${escapeHtml(mascot.flavor)}</small>`;
    button.addEventListener("click", () => {
      if (locked) return;
      const select = el("gateMascotSelect");
      if (select) select.value = key;
      renderMascotCards(key, false);
      updateMascotPreview(key);
      renderDeviceState();
    });
    mount.appendChild(button);
  });
}

function encodeTeamIdentity(displayName, mascotKey = DEFAULT_MASCOT, fallbackName = "Team", flagKeys = DEFAULT_PRIDE_FLAG_KEYS){
  const cleanName = (displayName || fallbackName || "Team").trim() || fallbackName || "Team";
  return `${cleanName}${TEAM_IDENTITY_SEPARATOR}${normalizeMascotKey(mascotKey)}`;
}

function parseTeamIdentity(rawValue, fallbackName = "Team"){
  const fallback = (fallbackName || "Team").trim() || "Team";
  if (!rawValue || typeof rawValue !== "string") {
    const mascot = mascotMeta(DEFAULT_MASCOT);
    const flagKeys = [];
    const flags = flagKeys.map(prideFlagMeta);
    return { raw: encodeTeamIdentity(fallback, DEFAULT_MASCOT, fallback, flagKeys), displayName: fallback, mascotKey: DEFAULT_MASCOT, mascot, flagKeys, flags, primaryFlag: flags[0] };
  }
  const pieces = rawValue.split(TEAM_IDENTITY_SEPARATOR);
  const displayName = (pieces[0] || fallback).trim() || fallback;
  const mascotKey = normalizeMascotKey((pieces[1] || "").trim());
  const mascot = mascotMeta(mascotKey);
  const flagKeys = normalizeFlagKeys((pieces[2] || "").split(","));
  const flags = flagKeys.map(prideFlagMeta);
  return { raw: encodeTeamIdentity(displayName, mascotKey, fallback, flagKeys), displayName, mascotKey, mascot, flagKeys, flags, primaryFlag: flags[0] };
}

function teamIdentity(rawValue, team = teamKey){
  const fallback = team ? teamFallbackLabel(team) : "Team";
  return parseTeamIdentity(rawValue, fallback);
}


function hasTeamBeenClaimed(progress, team){
  if (!progress) return false;
  return Number(progress.progressIndex || 0) > 0
    || (Array.isArray(progress.completed) && progress.completed.length > 0)
    || !!progress.finished;
}

function mascotBadgeMarkup(identity, opts = {}){
  if (!identity) return "";
  const showLabel = !!opts.showLabel;
  const label = showLabel ? ` ${escapeHtml(identity.mascot.label)}` : "";
  return `<span class="mascotBadge ${identity.mascot.badgeClass}">${identity.mascot.emoji}${label}</span>`;
}

function teamThemeClass(rawValue, team = teamKey){
  return teamIdentity(rawValue, team).mascot.badgeClass;
}

function applyTeamTheme(rawValue, team = teamKey){
  const body = document.body;
  if (!body) return;
  Object.values(MASCOTS).forEach(meta => body.classList.remove(meta.badgeClass));
  body.classList.add(teamThemeClass(rawValue, team));
}

function updateMascotPreview(selected){
  const preview = el("gateMascotPreview");
  if (!preview) return;
  const mascot = mascotMeta(selected);
  preview.className = `mascotPreviewCard ${mascot.badgeClass}`;
  preview.innerHTML = `<span class="mascotPreviewEmoji">${mascot.emoji}</span><div><strong>${escapeHtml(mascot.label)} • ${escapeHtml(mascot.title)}</strong><div class="small">${escapeHtml(mascot.flavor)} This mascot becomes the team badge, color theme, and race vibe.</div></div>`;
}

function setTeamIdentityInputs(rawValue, locked){
  const hasTeam = gateMode === "create";
  const identity = parseTeamIdentity(rawValue, hasTeam ? "Team" : "");
  const input = el("gateTeamName");
  const select = el("gateMascotSelect");
  if (input){
    const displayName = hasTeam
      ? ((locked || identity.displayName !== "Team") ? identity.displayName : "")
      : "";
    input.value = locked ? identity.displayName : displayName;
    input.readOnly = !!locked;
    input.disabled = !!locked;
    input.placeholder = locked ? "Team name already locked" : "Enter team name";
  }
  if (select){
    select.value = identity.mascotKey;
    select.disabled = !!locked;
  }
  renderMascotCards(identity.mascotKey, locked);
  updateMascotPreview(identity.mascotKey);
  updateGateSelectionStatus(locked, identity);
  renderDeviceState();
}

function currentGateIdentityRaw(){
  const select = el("gateMascotSelect");
  const input = el("gateTeamName");
  const mascotKey = normalizeMascotKey(select?.value || DEFAULT_MASCOT);
  const baseName = (input?.value || "").trim() || "Team";
  return encodeTeamIdentity(baseName, mascotKey, "Team", selectedGateFlagKeys());
}

function populateMascotOptions(selected = DEFAULT_MASCOT){
  const select = el("gateMascotSelect");
  if (!select) return;
  if (!select.options.length){
    Object.entries(MASCOTS).forEach(([key, mascot]) => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = `${mascot.emoji} ${mascot.label}`;
      select.appendChild(opt);
    });
    select.addEventListener("change", () => {
      renderMascotCards(select.value, !!select.disabled);
      updateMascotPreview(select.value);
      renderDeviceState();
    });
  }
  select.value = normalizeMascotKey(selected);
  renderMascotCards(select.value, !!select.disabled);
  updateMascotPreview(select.value);
}

function joinableTeamSummaries(){
  return visibleTeamIds().map(id => {
    const progress = progressStateFor(id);
    const row = cachedBoardState(id) || {};
    const rawName = progress?.teamName || row.team_name || row.teamName || teamFallbackLabel(id);
    const identity = teamIdentity(rawName, id);
    return {
      id,
      rawName,
      identity,
      progress,
      found: row.found ?? progress?.completed?.length ?? 0,
      finished: row.finished ?? progress?.finished ?? false,
      lastUpdatedAt: row.lastUpdatedAt ?? row.last_updated_at ?? progress?.lastUpdatedAt ?? 0
    };
  }).sort((a, b) => a.identity.displayName.localeCompare(b.identity.displayName));
}

function findExistingTeamByName(displayName){
  const target = normalizeTeamName(displayName);
  return joinableTeamSummaries().find(entry => normalizeTeamName(entry.identity.displayName) === target) || null;
}

function setGateMode(mode){
  gateMode = mode === "create" ? "create" : "join";
  gateProfileTarget = null;
  const joinBtn = el("gateModeJoinBtn");
  const createBtn = el("gateModeCreateBtn");
  const joinWrap = el("gateJoinWrap");
  const createWrap = el("gateCreateWrap");
  if (joinBtn) joinBtn.classList.toggle("active", gateMode === "join");
  if (createBtn) createBtn.classList.toggle("active", gateMode === "create");
  if (joinWrap) joinWrap.classList.toggle("hidden", gateMode !== "join");
  if (createWrap) createWrap.classList.toggle("hidden", gateMode !== "create");
  setGateStage("team");
  if (gateMode === "create"){
    teamKey = null;
    setTeamIdentityInputs(currentGateIdentityRaw(), false);
  }
  renderGateTeams(teamKey);
}

function buildEggProgressDots(){
  const mount = el("eggProgress");
  if (!mount || !teamKey) return;
  mount.innerHTML = "";
  const total = teamTotal();
  for (let i = 0; i < total; i += 1){
    const dot = document.createElement("span");
    dot.className = "eggDot";
    if (i < state.completed.length) dot.classList.add("complete");
    else if (i === state.progressIndex && !state.finished) dot.classList.add("current");
    mount.appendChild(dot);
  }
}

function playUiTone(kind = "success"){
  try {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return;
    if (!audioContext) audioContext = new AudioCtor();
    if (audioContext.state === "suspended") audioContext.resume();
    const notes = kind === "victory"
      ? [523.25, 659.25, 783.99]
      : kind === "wrong"
        ? [246.94, 220]
        : [392, 523.25];
    notes.forEach((frequency, idx) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = kind === "wrong" ? "triangle" : "sine";
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, audioContext.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(kind === "wrong" ? 0.03 : 0.05, audioContext.currentTime + idx * 0.07 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + idx * 0.07 + 0.18);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(audioContext.currentTime + idx * 0.07);
      osc.stop(audioContext.currentTime + idx * 0.07 + 0.2);
    });
  } catch (error) {
    console.error(error);
  }
}

function burstCelebration(type = "success"){
  const emojis = type === "victory" ? ["🏳️‍🌈","🏳️‍⚧️","✨","🎉","💖"] : ["🌈","✨","💖","✅","🔓"];
  for (let i = 0; i < 12; i += 1){
    const piece = document.createElement("span");
    piece.className = "burstEmoji";
    piece.textContent = emojis[i % emojis.length];
    piece.style.setProperty("--dx", `${(Math.random() * 320 - 160).toFixed(0)}px`);
    piece.style.setProperty("--dy", `${(-220 - Math.random() * 180).toFixed(0)}px`);
    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
  playUiTone(type === "victory" ? "victory" : "success");
  if (navigator.vibrate) navigator.vibrate(type === "victory" ? [120, 70, 180] : [80, 40, 110]);
}

function showMissionOverlay({ badge = "✅ Mission update", title = "Mission unlocked", copy = "You unlocked your next clue.", flavor = "A fresh page just slid out of the dossier.", stamp = "CASE FILE OPENED", meta = "Head back to the mission board for your next riddle.", page = "choresPage" } = {}){
  if (missionOverlayTimer){
    clearTimeout(missionOverlayTimer);
    missionOverlayTimer = null;
  }
  if (el("missionBadge")) el("missionBadge").textContent = badge;
  if (el("missionTitle")) el("missionTitle").textContent = title;
  if (el("missionCopy")) el("missionCopy").textContent = copy;
  if (el("missionFlavor")) el("missionFlavor").textContent = flavor;
  if (el("missionStamp")) el("missionStamp").textContent = stamp;
  if (el("missionMeta")) el("missionMeta").textContent = meta;
  const btn = el("missionActionBtn");
  if (btn) btn.onclick = () => {
    hideMissionOverlay();
    setPage(page);
  };
  const overlay = el("missionOverlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    missionOverlayTimer = window.setTimeout(() => {
      hideMissionOverlay();
    }, MISSION_OVERLAY_AUTO_HIDE_MS);
  }
}

function hideMissionOverlay(){
  if (missionOverlayTimer){
    clearTimeout(missionOverlayTimer);
    missionOverlayTimer = null;
  }
  const overlay = el("missionOverlay");
  if (overlay) overlay.classList.add("hidden");
}

function renderLeadBanner(rows = boardRows()){
  const banner = el("leadBanner");
  if (!banner) return;
  const activeRows = rows.filter(row => row.found > 0 || row.finished);
  if (!activeRows.length){
    banner.textContent = "The Pride race is on. Crack the first checkpoint and post the first live time.";
    return;
  }
  const leader = rows[0];
  const identity = teamIdentity(leader.teamNameRaw || leader.teamName, leader.key);
  const liveSuffix = leader.finished
    ? `Fastest finish so far: ${formatDuration(leader.completionTimeMs)}. ${placementPrizeText(1)} is locked in.`
    : `${leader.found} clues solved in ${formatDuration(leader.elapsedMs)} so far.`;
  banner.innerHTML = `${mascotBadgeMarkup(identity)} <span><strong>${escapeHtml(identity.displayName)}</strong> is currently in the lead. ${escapeHtml(liveSuffix)}</span>`;
}

function updateFinalMissionMode(){
  document.body.classList.toggle("finalMissionMode", !!state && (isOnFinalClue(state, teamKey) || state.finished));
}

function localMapEnabled(){
  return false;
}

function setLocalMapEnabled(value){
  mapEnabled = false;
  localStorage.setItem(MAP_ENABLED_KEY, "false");
}

function sharedSettingsState(){
  return { mapEnabled: false };
}

function isMapEnabled(){
  return false;
}

async function pushSharedSettings(){
  if (!supabaseReady) return;
  const payload = {
    team_id: SHARED_SETTINGS_TEAM_ID,
    team_name: "Shared Settings",
    sequence: [],
    progress_index: 0,
    completed: [],
    scanned_tokens: [],
    used_hints: 0,
    next_hint_at: null,
    revealed_hint_clue_id: null,
    finished: false,
    started_at: Date.now(),
    finished_at: 0,
    completion_time_ms: 0,
    last_updated_at: Date.now(),
    map_enabled: false
  };
  const { error } = await supabaseClient.from(PROGRESS_TABLE).upsert(payload, { onConflict: "team_id" });
  if (error) {
    console.error(error);
    setSyncState("error", "Shared settings failed to update. Retrying soon.");
  } else {
    setSyncState("live", "Shared progress is live across devices.");
  }
}

function updateAdminMapButton(){
  const btn = el("adminToggleMapBtn");
  if (!btn) return;
  btn.textContent = "Map disabled in this build";
  btn.disabled = true;
}

function applyMapVisibility(){
  const mapPage = el("mapPage");
  const mapCard = mapPage ? mapPage.querySelector("#mapCard") : null;
  const grid = mapPage ? mapPage.querySelector("#mapPageGrid") : null;
  const navBtn = document.querySelector('.menuBtn[data-page="mapPage"]');
  if (mapCard) mapCard.classList.add("hidden");
  if (grid) grid.classList.add("mapPageLeaderboardOnly");
  if (navBtn) navBtn.textContent = "Standings";
  updateAdminMapButton();
}

function defaultState(teamLabel = "Team", sequence = generateRandomSequence()){
  return {
    teamName: encodeTeamIdentity(teamLabel, DEFAULT_MASCOT, teamLabel),
    sequence: normalizeSequence(sequence),
    progressIndex: 0,
    completed: [],
    scannedTokens: [],
    members: [],
    usedHints: 0,
    nextHintAt: null,
    revealedHintClueId: null,
    finished: false,
    startedAt: 0,
    completedAt: 0,
    completionTimeMs: 0,
    lastUpdatedAt: 0
  };
}

function readJson(key, fallback){
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error){
    console.error(error);
    return fallback;
  }
}

function loadLocalState(team){
  const saved = readJson(storageKey(team), defaultState(teamFallbackLabel(team), sequenceForTeam(team)));
  if (!saved || typeof saved !== "object") return defaultState(teamFallbackLabel(team), sequenceForTeam(team));
  saved.sequence = normalizeSequence(saved.sequence || sequenceForTeam(team, saved));
  saved.members = normalizeTeamMembers(saved.members);
  if (saved && typeof saved.revealedHintClueId === "undefined") saved.revealedHintClueId = null;
  if (saved && typeof saved.completedAt === "undefined") saved.completedAt = 0;
  if (saved && typeof saved.completionTimeMs === "undefined") saved.completionTimeMs = saved.finished ? completionTimeMsForState(saved) : 0;
  return saved;
}
