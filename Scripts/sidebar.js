const NotesView = require("./sidebar/NotesView")

class BridgetownSidebar {
  constructor() {
    this.start()
  }

  deactivate() {
    this.stop()
  }

  start() {
    if (this.notesView) {
      this.notesView.deactivate()
      nova.subscriptions.remove(this.notesView)
    }

    this.notesView = new NotesView()
    nova.subscriptions.add(this.notesView)
  }

  stop() {
    if (this.notesView) {
      this.notesView.deactivate()
      nova.subscriptions.remove(this.notesView)
      this.notesView = null
    }
  }
}

module.exports = BridgetownSidebar
