
class FileModel {
  private readonly _name: File['name']
  private readonly _arrayBuffer: File['arrayBuffer']
  private readonly _size: File['size']
  private readonly _lastModified: File['lastModified']
  private readonly _type: File['type']

  constructor (file: File) {
    this._name = file.name
    this._arrayBuffer = file.arrayBuffer
    this._size = file.size
    this._lastModified = file.lastModified
    this._type = file.type
  }

  get object () {
    return {
      name: this._name,
      arrayBuffer: this._arrayBuffer,
      size: this._size,
      lastModified: this._lastModified,
      type: this._type,
    }
  }
}