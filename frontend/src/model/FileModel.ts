
export class FileModel {
  private readonly _name: File['name']
  private readonly _arrayBuffer: File['arrayBuffer']
  private readonly _size: File['size']
  private readonly _lastModified: File['lastModified']
  private readonly _type: File['type']
  private readonly _slice: File['slice']
  private readonly _stream: File['stream']
  private readonly _text: File['text']
  private readonly _file: File

  constructor (file: File) {
    this._name = file.name
    this._arrayBuffer = file.arrayBuffer
    this._size = file.size
    this._lastModified = file.lastModified
    this._type = file.type
    this._slice = file.slice
    this._stream = file.stream
    this._text = file.text
    this._file = file
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

  get blob (): string | Blob {
    return this._file
  }
}