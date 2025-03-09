import { RpgServerEngine } from "@rpgjs/server"
import { RpgModule, RpgServer, RpgPlayer } from '@rpgjs/server'

let serverEngine

export default {
    auth(engine: RpgServerEngine, socket) {

    },
    onStart(engine: RpgServerEngine) {
      serverEngine = engine

    },
    onConnected(player: RpgPlayer) {
        console.log(player)
            player.on("custom_message", (data) => {
                            console.log(`📩 Received from ${player.id}:`, data.text);

                            // Send response back
                        });
        }
}
