
interface CSVStatsDTO {
  total: number
  success: number
  error: number
}

export class CSVStats {
  private _total: CSVStatsDTO['total']
  private _success: CSVStatsDTO['success']
  private _error: CSVStatsDTO['error']

  constructor (csvStats: CSVStatsDTO) {
    this._total = csvStats?.total
    this._success = csvStats?.success
    this._error = csvStats?.error
  }

  get object () {
    return {
      total: this._total,
      success: this._success,
      error: this._error
    }
  }

  get toMessage () {
    return this.object
  }

  addSuccess () {
    ++this._success
    ++this._total
  }

  addError () {
    ++this._error
    ++this._total
  }
}
