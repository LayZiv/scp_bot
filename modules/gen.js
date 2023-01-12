const { EmbedBuilder, PermissionsBitField } = require('discord.js');
cmdinfo = require("../JSONs/commands.json")

exports.generalcommands = {
    ";help": function(args,msg) {

        var generalcmds = "";
        for (var i = 0; i < cmdinfo.gcmds.length; i++) {
            generalcmds = generalcmds + cmdinfo.gcmds[i] + "\n";
        }

        var funcmds = "";
        for (var i = 0; i < cmdinfo.fcmds.length; i++) {
            funcmds = funcmds + cmdinfo.fcmds[i] + "\n";
        }

        var modcmds = "";
        for (var i = 0; i < cmdinfo.mcmds.length; i++) {
            modcmds = modcmds + cmdinfo.mcmds[i] + "\n";
        }

        const helpEmbed = new EmbedBuilder()
            .setColor(0x000000)
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
        if (!msg.member.permissions.has([PermissionsBitField.Flags.MentionEveryone])) return msg.reply("Invalid permissions.");
        msg.channel.send("@here\n\n**GRP** [Top Server]\n\nhttps://www.roblox.com/games/5118029260/Group-Recruiting-Plaza-6-5");
    },

    ";ssu" : function(args,msg) {
        if (!msg.member.permissions.has([PermissionsBitField.Flags.MentionEveryone])) return msg.reply("Invalid permissions.");
        msg.channel.send("@here\n\n**SSU** [CoE in effect]\n\nhttps://www.roblox.com/games/11969422877/Site-Bravo");
    }
}