module.exports = {
  Admins: ["UserID", "UserID"], //DEV'S
  ExpressServer: true, 
  DefaultPrefix: process.env.Prefix || ">",
  Port: 80, //Which port website gonna be hosted
  SupportServer: "https://discord.io/sciencegear", // Support Server Link
  Token: process.env.Token || "MTE0NTU4MjQ3ODc3NDUwNTQ3Mw.G1DFeJ.YCKf3qB5QeFE6jbxNEvyqjwQz2LE6crbSZO_FA", // Discord Bot Token
  ClientID: process.env.Discord_ClientID || "1145582478774505473", 
  ClientSecret: process.env.Discord_ClientSecret || "ihrZThlFemFXtGS90fA7OlfmO77btTAy", 
  Scopes: ["identify", "guilds", "applications.commands"],
  ServerDeafen: true, 
  DefaultVolume: 100,
  CallbackURL: "/api/callback", 
  "24/7": false,
  CookieSecret: "Coscu es GOD",
  IconURL:
    "https://media.tenor.com/sce9SDRey4EAAAAi/disc.gif",
  EmbedColor: "RANDOM", 
  Permissions: 2205281600, 
  Website: process.env.Website || "http://127.0.0.1/",

  Presence: {
    status: "online", // You can show online, idle, and dnd
    name: "Mame32", // The message shown
    type: "PLAYING", // PLAYING, WATCHING, LISTENING, STREAMING
  },

  Lavalink: {
    id: "Main",
    host: "ssl.horizxon.studio", 
    port: 443, 
    pass: "horizxon.studio", 
    secure: true, 
    retryAmount: 200, 
    retryDelay: 40, 
  },
  
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "", 
    ClientSecret: process.env.Spotify_ClientSecret || "", 
  },


 

};
