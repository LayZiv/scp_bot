const { Client, Events, GatewayIntentBits, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');

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
	console.log(`Ready! Logged in as ${bot.user.tag}`);
});

// We're going for the classic approach of simple text commands as I fucking hate the application command bullshit
const modcommands = {
    ";set-join-channel": function(args,msg) {

        const file = require("./data.json");
        file.joinchannel = msg.channel.id;

        fs.writeFile("./data.json", JSON.stringify(file), function writeJSON(err) {
            if (err) {
                console.log(err);
                msg.channel.send("Failed to set join channel. Error has been logged to terminal.")
            } else {
                msg.channel.send("Join channel set.")
            }
        });
    },

    ";purge": function(args,msg) {
        
        if (!msg.member.permissions.has(PermissionsBitField.Flags.ManageMessages,true)) {
            msg.reply("Invalid Permissions.");
            return;
        }

        var amount = parseInt(args[1]);
        if (isNaN(amount)) {msg.reply("Invalid argument."); return;}

        msg.channel.bulkDelete(amount).then(() => {
            msg.channel.send(`Purged **${amount}** message(s).`)
        })

        msg.reply("Invalid argument.");
        
    },

    ";kick": function(args,msg) {
        if (!msg.member.permissions.has("KICK_MEMBERS")) return msg.reply("Invalid permissions.");
    
        if (!args[1]) return msg.channel.send("Specify a member.");
    
        let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
    
        if (!member) return msg.channel.send("That was not a member.")
        
        if (member.id == client.user.id) {
            return msg.channel.send(`Common <@${msg.author.id}> L`)
        }
    
        if (msg.member.roles.highest.comparePositionTo(msg.mentions.members.first().roles.highest) < 1) {
            return msg.reply("You cannot kick this user.");
        }
    
        if (msg.member.id === member.id) return msg.channel.send(`Common <@${msg.author.id}> L`);

        member.kick();

        msg.reply(`Kicked <@${member.user.id}>.`);
    }
}

const funcommands = {
    ";urgent": function(args,msg) {
        msg.channel.send("https://media.discordapp.net/attachments/1055953641120464918/1059997681092677702/output-onlinegiftools1.gif")
    },

    ";ping": function(args,msg) {
        msg.reply("pong!");
    },

    ";e&t": function(args,msg) {
        msg.reply("https://www.youtube.com/watch?v=7K7UdPaYZkA");
    },
}

const generalcommands = {
    ";help": function(args,msg) {

        var generalcmds = "";
        for (const [key, value] of Object.entries(generalcommands)) {
            generalcmds = generalcmds + key + "\n";
        }

        var funcmds = "";
        for (const [key, value] of Object.entries(funcommands)) {
            funcmds = funcmds + key + "\n";
        }

        var modcmds = "";
        for (const [key, value] of Object.entries(modcommands)) {
            modcmds = modcmds + key + "\n";
        }

        const helpEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('SCP: Exploration')
            .addFields(
                { name: 'General', value: generalcmds, inline: true },
                { name: 'Fun', value: funcmds, inline: true },
                { name: 'Moderation', value: modcmds, inline: true }
            )
            .setThumbnail("https://media.discordapp.net/attachments/1004777138827821076/1062856783577751662/Screenshot_2023-01-01_190932-removebg-preview.png")
            .setFooter({ text: 'Made by LayZiv'});


        msg.channel.send({ embeds: [helpEmbed] });
    },

    ";grp" : function(args,msg) {
        msg.channel.send("@here\n\n**GRP** [Top Server]\n\nhttps://www.roblox.com/games/5118029260/Group-Recruiting-Plaza-6-5");
    },

    ";ssu" : function(args,msg) {
        msg.channel.send("@here\n\n**SSU** [CoE in effect]\n\nhttps://www.roblox.com/games/11969422877/Site-Bravo");
    }
}

function handleCommands(args,msg) {
    if (generalcommands[args[0]] != null) {
        generalcommands[args[0]](args,msg);
    } else if (funcommands[args[0]] != null) {
        funcommands[args[0]](args,msg);
    } else if (modcommands[args[0]] != null) {
        modcommands[args[0]](args,msg);
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
    const data = require("./data.json");
    member.guild.channels.fetch(data.joinchannel)
    .then(channel => {
        channel.send(`Welcome to the SCPF's Discord, <@${member.user.id}>.`);
    })
    .catch(console.error);

})

client.login(token);
