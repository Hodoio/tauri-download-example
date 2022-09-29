import { useCallback } from 'react'
import { fetch, ResponseType } from '@tauri-apps/api/http'
import axios from 'axios'
import './App.css'

// 30MB file
const url = 'https://cache-1256738511.cos.ap-chengdu.myqcloud.com/files/pdf/download-file.pdf'

function App () {
  const tauriDownload = useCallback(async () => {
    try {
      console.time('tauri fetch download')
      const res = await fetch(url, { method: 'get', responseType: ResponseType.Binary })
      console.log(res)
      console.timeEnd('tauri fetch download')
    } catch (e) {
      console.error(e)
    }
  }, [])

  const axiosDownload = useCallback(async () => {
    try {
      console.time('axios download')
      const res = await axios(url, { method: 'get', responseType: 'arraybuffer' })
      console.log(res)
      console.timeEnd('axios download')
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <div className="container">
      <div>
        <button onClick={tauriDownload}>Tauri fetch download</button>
        <button style={{ marginLeft: '20px' }} onClick={axiosDownload}>axios download</button>
      </div>
    </div>
  )
}

export default App
