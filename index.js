var nodeVersion = process.version.split('.');
var major = nodeVersion[0].replace("v", "");
var minor = nodeVersion[1];

if(major < 16 || major <= 16 && minor < 6){
    console.log("Minimum Node.JS v16.6 is required for Discord.JS v13");
    process.exit(-1);
}

const { Client, Intents, MessageEmbed } = require('discord.js');
const config = require('./config.json');

const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
]});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.username}#${client.user.discriminator}`);
});

client.on("messageCreate", (message) => {
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase();
    var cmdArgs = args.join(" ").split(" ");

    if(command == `ping`){
        return message.reply(`Latency: ${client.ws.ping} ms`);
    } else if(command == `${config.prefix}say`){
        if(!cmdArgs[0]) return message.reply("Put something to say !");
        message.reply(args);
    } else if(command == `test`){
        if(!args[0]) return message.reply("Make a choice !");
        var choix = args.split(" ")[0];
        message.reply(choix);
    } else if(command == `owner`){
        if(config.ownerID.includes(message.author.id)){
            message.reply("OK");
        } else {
            message.reply("You are not Owner !");
        }
    }
})

client.login(config.token);
