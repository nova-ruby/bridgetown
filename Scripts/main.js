/**
 * Bridgetown.novaextension - main.js
 * @author Tommaso Negri
 */

const BridgetownTaskAssistant = require("./BridgetownTaskAssistant")

nova.assistants.registerTaskAssistant(BridgetownTaskAssistant, {
  identifier: "bridgetown",
  name: "Bridgetown",
})
