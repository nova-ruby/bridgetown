const BridgetownSidebar = require("./sidebar")
const { isBridgetownProject, showNotification } = require("./helpers")

let sidebar = null

exports.activate = function() {
  if (nova.inDevMode()) console.log("Hello from Bridgetown (DEV mode)")
  else console.log("Hello from Bridgetown")

  if (isBridgetownProject()) {
    nova.workspace.bridgetownDetected = true

    showNotification(
      "bridgetown-detected",
      "Bridgetown Found in Project",
      false,
      "Specific features will be enabled..."
    )
  } else {
    nova.workspace.bridgetownDetected = false
  }

  sidebar = new BridgetownSidebar()
}

exports.deactivate = function() {
  if (sidebar) {
    sidebar.deactivate()
    sidebar = null
  }

  console.log("Goodbye from Bridgetown")
}
