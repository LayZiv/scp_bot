const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs');

exports.modcommands = {
    ";set-join-channel": function(args,msg) {

        const file = require("./JSONs/data.json");
        file.joinchannel = msg.channel.id;

        fs.writeFile("./JSONs/data.json", JSON.stringify(file), function writeJSON(err) {
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
        if (isNaN(amount)) {msg.reply("USAGE: ;purge {amount}"); return;}

        msg.channel.bulkDelete(amount).then(() => {
            msg.channel.send(`Purged **${amount}** message(s).`)
        })
        
    },

    ";kick": function(args,msg) {
        if (!msg.member.permissions.has("KICK_MEMBERS")) return msg.reply("Invalid permissions.");
    
        if (!args[1]) return msg.channel.send("USAGE: ;kick {member}");
    
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
};
