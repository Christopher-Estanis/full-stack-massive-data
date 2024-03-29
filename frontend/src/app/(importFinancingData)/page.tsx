'use client'
import socket from '@/config/SocketConfig'
import { FileModel } from '@/model/FileModel'
import axios from 'axios'
import Image from 'next/image'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'

interface FileStatsDTO {
  total: number
  success: number
  error: number
}

export default function Home() {
  const [file, setFile] = useState<FileModel>()
  const [fileStats, setFileStats] = useState<FileStatsDTO>({ error: 0, success: 0, total: 0 })
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files?.[0]) return '' // TODO Handle with error
    
    const file = new FileModel(e.target?.files?.[0])

    setFile(file)
  }

  const handleUploadFinancingCSV = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    try {
      const formData = new FormData()

      if (file) formData.append('csv', file.blob)

      const response = await axios.post('http://172.24.122.90:5000/financing/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      console.log(response.data)
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error)
    }
  }

  useEffect(() => {
    socket.connect()

    socket.on('message', (message) => setFileStats(message))
    return () => {
      socket.disconnect()
    }
  }, [])
  
  return (
    <main className="full-w flex flex-col gap-y-4">
      <section className='flex flex-col gap-y-4'>
        <h1>Importação de dados financeiros</h1>
        <p>Realize uma importação e veja quais dados de seu arquivo CSV estão incorretos.</p>
      </section>

      <section className='flex flex-row justify-between rounded-md bg-slate-50	p-12'>
        <div className='flex flex-1 gap-y-2 flex-col justify-center items-center'>
          <label 
            htmlFor="file-input" 
            className="w-3/4 cursor-pointer bg-blue-500 text-white p-2 rounded-md text-center hover:bg-blue-600 transition duration-300"
          >
            <span>Selecionar Arquivo CSV</span>
            <input 
              id="file-input" 
              type="file" 
              className="hidden" 
              accept=".csv" 
              onChange={handleFileChange} 
            />
          </label>
          <p>Arquivo: {file && file.object.name}</p>
          <button 
            onClick={handleUploadFinancingCSV} 
            className={`${file ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer' : 'bg-gray-400 cursor-no-drop'} w-3/4 text-white p-2 rounded-md text-center transition duration-300`}
          >
            Enviar Arquivo
          </button>
        </div>

        <div className='flex-1'>
          <h1>{fileStats.error}</h1>
          <p>Quantidade de erros</p>
        </div>

        <div className='flex-1'>
          <h1>{fileStats.success}</h1>
          <p>Quantidade de sucessos</p>
        </div>

        <div className='flex-1'>
          <h1>{fileStats.total}</h1>
          <p>Quantidade de linhas processadas</p>
        </div>
      </section>
    </main>
  )
}