/**
 * Bridgetown.novaextension - BridgetownTaskAssistant.js
 * @author Tommaso Negri
 */

/**
 * @implements TaskAssistant
 */
class BridgetownTaskAssistant {
  constructor() {
    /** @type {(Task.Run|Task.Build|Task.Clean)} */
    this.action = null
    /** @type {Configuration} */
    this.config = null
  }

  /**
   * Resolve a TaskAction invoked by the user.
   * @param {TaskActionResolveContext} context
   * @returns {(TaskProcessAction|null)}
   */
  resolveTaskAction(context) {
    this.updateContext(context)

    switch (this.action) {
      case Task.Run:
        return this.runAction
      case Task.Build:
        return this.buildAction
      case Task.Clean:
        return this.cleanAction
    }
  }

  /**
   * Update the task assistant context.
   * @private
   * @param {TaskActionResolveContext} context
   */
  updateContext(context) {
    this.action = context.action
    this.config = context.config
  }

  /**
   * Return the Run action.
   * @private
   * @type {TaskProcessAction}
   */
  get runAction() {
    return this.actionWithArgs(["dev", ...this.standardArgs, ...this.devArgs])
  }

  /**
   * Return the Build action.
   * @private
   * @type {TaskProcessAction}
   */
  get buildAction() {
    return this.actionWithArgs(["build", ...this.standardArgs])
  }

  /**
   * Return the Clean action.
   * @private
   * @type {TaskProcessAction}
   */
  get cleanAction() {
    return this.actionWithArgs(["clean", ...this.standardArgs])
  }

  /**
   * Return an action with the specified args.
   * @private
   * @param {[string]} args
   * @returns {TaskProcessAction}
   */
  actionWithArgs(args) {
    return new TaskProcessAction("bin/bridgetown", {
      args: args,
      shell: true
    })
  }

  /**
   * Return the standard args for a Bridgetown command.
   * @private
   * @type {[string]}
   */
  get standardArgs() {
    /** @type {[string]} */
    const args = []
    let arg

    // Standard
    if (arg = this.getConfig("url")) {
      args.push(`--url=${arg}`)
    }
    if (arg = this.getConfig("basePath")) {
      args.push(`--base-path=${arg}`)
    }
    if (arg = this.getConfig("future")) {
      if (arg == "Enabled")  args.push("--future")
      if (arg == "Disabled") args.push("--no-future")
    }
    if (arg = this.getConfig("unpublished")) {
      if (arg == "Enabled")  args.push("--unpublished")
      if (arg == "Disabled") args.push("--no-unpublished")
    }

    // Directories
    if (arg = this.getConfig("directories.root")) {
      args.push(`--root-dir=${arg}`)
    }
    if (arg = this.getConfig("directories.source")) {
      args.push(`--source=${arg}`)
    }
    if (arg = this.getConfig("directories.destination")) {
      args.push(`--destination=${arg}`)
    }
    if (arg = this.getConfig("directories.layouts")) {
      args.push(`--layouts-dir=${arg}`)
    }

    // Advanced
    if (arg = this.getConfig("advanced.environment")) {
      args.push(`--environment=${arg}`)
    }
    if (arg = this.getConfig("advanced.configFiles")) {
      if (arg.length > 0) args.push(`--config="${arg.join(" ")}"`)
    }

    // Advanced - Watch
    if (this.getConfig("advanced.watch.regeneration") == false) {
      args.push("--no-watch")
    }
    if (this.getConfig("advanced.watch.trace") == false) {
      args.push("--no-trace")
    }
    if (arg = this.getConfig("advanced.watch.forcePolling")) {
      if (arg == "Enabled")  args.push("--force-polling")
      if (arg == "Disabled") args.push("--no-force-polling")
    }
    if (arg = this.getConfig("advanced.watch.disableDiskCache")) {
      if (arg == "Enabled")  args.push("--disable-disk-cache")
      if (arg == "Disabled") args.push("--no-disable-disk-cache")
    }

    // Advanced - Console
    if (arg = this.getConfig("advanced.console.output")) {
      if (arg == "Verbose") args.push("--verbose")
      if (arg == "Quiet")   args.push("--quiet")
    }
    if (arg = this.getConfig("advanced.console.liquidProfiler")) {
      if (arg == "Enabled")  args.push("--profile")
      if (arg == "Disabled") args.push("--no-profile")
    }
    if (arg = this.getConfig("advanced.console.strictFrontMatter")) {
      if (arg == "Enabled")  args.push("--strict-front-matter")
      if (arg == "Disabled") args.push("--no-strict-front-matter")
    }

    return args
  }

  /**
   * Return the specific args for the Bridgetown `dev` command.
   * @private
   * @type {[string]}
   */
  get devArgs() {
    /** @type {[string]} */
    const args = []
    let arg

    // Advanced
    if (arg = this.getConfig("advanced.bind")) {
      args.push(`--bind=${arg}`)
    }
    if (this.getConfig("advanced.skipFrontend") == true) {
      args.push("--skip-frontend")
    }

    // Advanced - Watch
    if (this.getConfig("advanced.watch.liveReload") == false) {
      args.push("--skip-live-reload")
    }

    return args
  }

  /**
   * Return the config value with the specified key
   * @private
   * @param {string} key
   * @returns {(string|number|boolean|[string])}
   */
  getConfig(key) {
    return this.config.get(key)
  }
}

module.exports = new BridgetownTaskAssistant()
