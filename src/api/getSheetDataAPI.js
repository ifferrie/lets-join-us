const TOKEN = 'AIzaSyA9710kpoQsvusWNNBYcuj9maLxxrVlB8g'
const DEFAULT_RANGE = 'A1:E10'
const DEFAULT_VALUE_RENDER_OPT = 'FORMATTED_VALUE'
const DEFAULT_DATETIME_RENDER_OPT = 'FORMATTED_STRING'

async function getSheetData (
  spreadsheetId,
  range=DEFAULT_RANGE,
  valueRenderOption=DEFAULT_VALUE_RENDER_OPT,
  dateTimeRenderOption=DEFAULT_DATETIME_RENDER_OPT
) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?dateTimeRenderOption=${dateTimeRenderOption}&majorDimension=ROWS&key=${TOKEN}`
  const response = await fetch(url)
  const data = await response.json()
  return transformToJson(data.values)
}

const transformToJson = (dataRows) => {
  if (dataRows&&dataRows.length) {
    const keys = dataRows[0]
    const values = dataRows.slice(1, dataRows.length)
    const datas = values.map((v) => {
      return keys.reduce((prev, curr, i) => {
        return {
          ...prev,
          [curr]: v[i]
        }
      }, {})
    })
    return datas
  }
  return []
}

async function getEventSheet (sheetId) {
  const eventData = await getSheetData(sheetId)
  return await Promise.all(eventData.map(async (event) => {
    const data = await getSheetData(event.member_sheet_id)
    return {
      ...event,
      members: data
    }
  }))
}

export {
  getSheetData,
  getEventSheet,
}
