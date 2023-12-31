const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const lyricsFinder = require("lyrics-finder");
const _ = require("lodash");

module.exports = {
  name: "letra",
  description: "Muestra la letra de la canción buscada",
  usage: "[nombre de la canción]",
  permissions: {
    channel: ["VER_CANAL", "ENVIAR_MENSAJES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["letra", "sub"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    let SongTitle = args.join(" ");
    let SearchString = args.join(" ");
    if (!args[0] && !player)
      return client.sendTime(
        message.channel,
        "❌ | **Nada se está reproduciendo en este momento...**"
      );
    if (!args[0]) SongTitle = player.queue.current.title;
    SongTitle = SongTitle.replace(
      /lyrics|lyric|lyrical|official music video|\(official music video\)|audio|official|official video|official video hd|official hd video|offical video music|\(offical video music\)|extended|hd|(\[.+\])/gi,
      ""
    );

    let lyrics = await lyricsFinder(SongTitle);
    if (!lyrics)
      return client.sendTime(
        message.channel,
        `**No se encontraron letras para -** \`${SongTitle}\``
      );
    lyrics = lyrics.split("\n"); // separando en líneas
    let SplitedLyrics = _.chunk(lyrics, 40); // 40 líneas por página

    let Pages = SplitedLyrics.map((ly) => {
      let em = new MessageEmbed()
        .setAuthor(`Letra de: ${SongTitle}`, client.botconfig.IconURL)
        .setColor(client.botconfig.EmbedColor)
        .setDescription(ly.join("\n"));

      if (args.join(" ") !== SongTitle)
        em.setThumbnail(player.queue.current.displayThumbnail());

      return em;
    });

    if (!Pages.length || Pages.length === 1)
      return message.channel.send(Pages[0]);
    else return client.Pagination(message, Pages);
  },

  SlashCommand: {
    options: [
      {
        name: "cancion",
        value: "cancion",
        type: 3,
        description: "Ingresa el nombre de una canción para buscar",
        required: false,
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */

    run: async (client, interaction, args, { GuildDB }) => {
      let player = await client.Manager.get(interaction.guild_id);

      if (!interaction.data.options && !player)
        return client.sendTime(
          interaction,
          "❌ | **Nada se está reproduciendo en este momento...**"
        );

      SongTitle = interaction.data.options
        ? interaction.data.options[0].value
        : player.queue.current.title;
      let lyrics = await lyricsFinder(SongTitle);
      console.log(lyrics.length === 0);
      if (lyrics.length === 0)
        return client.sendTime(
          interaction,
          `**No se encontraron letras para -** \`${SongTitle}\``
        );
      lyrics = lyrics.split("\n"); // separando en líneas
      let SplitedLyrics = _.chunk(lyrics, 40); // 40 líneas por página

      let Pages = SplitedLyrics.map((ly) => {
        let em = new MessageEmbed()
          .setAuthor(`Letra de: ${SongTitle}`, client.botconfig.IconURL)
          .setColor(client.botconfig.EmbedColor)
          .setDescription(ly.join("\n"));

        if (SongTitle !== SongTitle)
          em.setThumbnail(player.queue.current.displayThumbnail());

        return em;
      });
      if (!Pages.length || Pages.length === 1)
        return interaction.send(Pages[0]);
    },
  },
};
