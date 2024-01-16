import Multer from 'multer'

export class MulterAdapter {
  private storage: Multer.StorageEngine
  private instance: Multer.Multer
  
  constructor (private readonly multer: typeof Multer) {
    this.storage = multer.memoryStorage()
    this.instance = multer({ storage: this.storage })
  }

  single (fileName: string) {
    return this.instance.single(fileName)
  }
}