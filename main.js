const { Client, Events, GatewayIntentBits, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { token } = require('./config.json');

const gen = require("./modules/gen.js");
const mod = require("./modules/mod.js");
const fun = require("./modules/fun.js");

const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMembers
        ]
    });

client.once(Events.ClientReady, bot => {
	console.log(`BOT ONLINE: ${bot.user.tag}`);
});

// We're going for the classic approach of simple text commands as I fucking hate the application command bullshit
function handleCommands(args,msg) {
    if (gen.generalcommands[args[0]] != null) {
        gen.generalcommands[args[0]](args,msg);
    } else if (fun.funcommands[args[0]] != null) {
        fun.funcommands[args[0]](args,msg);
    } else if (mod.modcommands[args[0]] != null) {
        mod.modcommands[args[0]](args,msg);
    }
}

client.on(Events.MessageCreate, msg => {

    if (msg.content[0] != ";") {
        return;
    }

    const args = msg.content.split(" ");
    handleCommands(args,msg);
})

client.on(Events.GuildMemberAdd, member => {

    // Fetch join channel
    const data = require("./JSONs/data.json");
    member.guild.channels.fetch(data.joinchannel)
    .then(channel => {
        channel.send(`Welcome to the SCPF's Discord, <@${member.user.id}>.`);
    })
    .catch(console.error);

})

client.login(token);
