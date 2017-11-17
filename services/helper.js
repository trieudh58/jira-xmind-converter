const xmind = require('xmind')
const uuid = require('uuid')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const Workbook = xmind.Workbook

exports.reduceStoryFields = (issue) => {
  return {
    key: issue.key,
    summary: issue.fields.summary,
  }
}

exports.exportXMind = (sprintName, issues) => {
  const options = {
    firstSheetId: uuid.v1(),
    firstSheetName: 'Sheet 1',
    rootTopicId: uuid.v1(),
    rootTopicName: sprintName,
  }
  const workbook = new Workbook(options)
  const workbookFilePath = path.join(__dirname, `../temp/${generateXmindFilename(sprintName)}`)
  const primarySheet = workbook.getPrimarySheet()
  const rootTopic = primarySheet.rootTopic
  issues.forEach(x => {
    const subTopicTitle = `[${x.key}] ${x.summary}`
    const subTopicOptions = {
      id: x.key,
      title: subTopicTitle,
    }
    rootTopic.addChild(subTopicOptions)
  })
  workbook.save(workbookFilePath)
  return workbookFilePath
}

exports.removeXmind = (filePath, delay) => {
  const DEFAULT_DELAY_TIME = 10
  setTimeout(() => {
    fs.unlink(filePath, () => {})
  }, (delay || DEFAULT_DELAY_TIME) * 1000)
}

function generateXmindFilename(sprintName) {
  const dateSignature = new Date().toISOString().split('T')[0]
  const randomTail = crypto.randomBytes(5).toString('hex')
  return sprintName.replace(/\s/g, '').concat('_', dateSignature, randomTail, '.xmind')
}
