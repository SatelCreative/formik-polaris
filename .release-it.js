module.exports = {
  git: {
    tagName: "${version}"
  },
  github: {
    release: true
  },
  scripts: {
    changelog: 'auto-changelog --stdout --commit-limit false -u --template ./changelog.hbs'
  },
  hooks: {
    'before:init': 'yarn lint && CI=true yarn test && yarn build',
    'after:bump': 'auto-changelog'
  }
}