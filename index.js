let VK = require("VK-Promise"),
	vk = new VK(" token "); //token
var typing = "/typing",
	audiomessage = "/voice",
  value = true;
vk.longpoll.start();
vk.on('message', function onMessage(event, msg) {
	if (!msg.out) return
	if (msg.body.toLowerCase().startsWith(typing)) {
		value = true;
		time = parseInt(msg.body.toLowerCase().replace(typing, '').trim()) * 12;
		delete_msg(msg);
		(async () => {
			for (var i = 0; i < time; i++) {
				if (!value) break;
				vk.messages.setActivity({
					peer_id: msg.peer_id,
					type: "typing"
				})
				await timer(5000);
			}
		})()
	} else if (msg.body.toLowerCase().startsWith(audiomessage)) {
		value = true;
		time = parseInt(msg.body.toLowerCase().replace(audiomessage, '').trim()) * 12;
		delete_msg(msg);
		(async () => {
			for (var i = 0; i < time; i++) {
				if (!value) break;
				vk.messages.setActivity({
					peer_id: msg.peer_id,
					type: "audiomessage"
				})
				await timer(5000);
			}
		})()
	} else if (msg.body == '/stop') {
		value = false;
		delete_msg(msg);
	}
})

function timer(ms) {
	return new Promise(res => setTimeout(res, ms));
};

function delete_msg(msg) {
	vk.messages.delete({
		delete_for_all: 1,
		message_ids: msg.id.toString()
	});
};
