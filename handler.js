const path = require('path')
const jira = require('./services/jira')
const { reduceStoryFields, exportXMind, removeXmind } = require('./services/helper')

exports.renderIndex = (req, res) => {
  res.render('main')
}

exports.downloadXmind = async (req, res) => {
  const { sprintName } = req.body
  if (!sprintName) {
    return res.render('404', { message: 'Sprint not found!' })
  }

  let sprint
  try {
    sprint = await jira.findSprint(sprintName)
  } catch (err) {
    return res.render('404', { message: 'Sprint not found!' })
  }

  let issues = sprint ? sprint.issues : []
  issues = issues.map(reduceStoryFields)

  let filepath
  try {
    filepath = exportXMind(sprintName, issues)
  } catch (err) {
    return res.render(500, { message: 'Failed to export xmind file!' })
  }
  
  res.download(filepath)
  removeXmind(filepath)
}
