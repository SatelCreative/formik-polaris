module.exports = {
  git: {
    tagName: "${version}"
  },
  github: {
    release: true
  },
  scripts: {
    beforeStart: 'yarn lint && yarn test && yarn build',
    changelog: 'auto-changelog --stdout --commit-limit false -u --template ./changelog.hbs',
    beforeStage: 'auto-changelog'
  }
}