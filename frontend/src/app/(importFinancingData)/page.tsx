'use client'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

export default function Home() {
  const [file, setFile] = useState<FileModel>();
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files?.[0]) return '' // TODO Handle with error

    const file = new FileModel(e.target?.files?.[0])

    setFile(file)
  }
  
  return (
    <main className="full-w flex flex-col gap-y-4">
      <section className='flex flex-col gap-y-4'>
        <h1>Importação de dados financeiros</h1>
        <p>Realize uma importação e veja quais dados de seu arquivo CSV estão incorretos.</p>
      </section>

      <section className='flex flex-row justify-between border-2 p-12'>
        <div className='flex flex-1 flex-col'>
          <label htmlFor="file-input" className="m-auto cursor-pointer bg-blue-500 text-white p-2 rounded-md text-center hover:bg-blue-600 transition duration-300">
            <span>Arquivo CSV</span>
            <input id="file-input" type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
          </label>
          <button className="m-auto cursor-pointer bg-green-500 text-white p-2 rounded-md text-center hover:bg-green-600 transition duration-300">Enviar Arquivo</button>
          <p>`Nome no arquivo: {file?.object?.name}</p>
        </div>

        <div className='flex-1'>
          <h1>0%</h1>
          <p>Porcentagem de linhas processadas</p>
        </div>
        
        <div className='flex-1'>
          <h1>0</h1>
          <p>Quantidade de erros</p>
        </div>

        <div className='flex-1'>
          <h1>0</h1>
          <p>Quantidade de sucessos</p>
        </div>

        <div className='flex-1'>
          <h1>0</h1>
          <p>Quantidade de linhas processadas</p>
        </div>
      </section>
      
    </main>
  )
}