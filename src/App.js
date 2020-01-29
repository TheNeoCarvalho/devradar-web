import React, {useState, useEffect} from 'react'
import './app.css'
import './global.css'
import './sidebar.css'
import './main.css'

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

import api from './services/api'

function App() {

  const [devs, setDevs] = useState([])

  const [github_username, setGithubUsername] = useState('')
  const [tags, setTags] = useState([])
  const [techs, setTechs] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  useEffect(()=>{
      navigator.geolocation.getCurrentPosition(
      (position) => {
       const { latitude, longitude } = position.coords
       setLatitude(latitude)
       setLongitude(longitude)
       
      },
      (err)=> {
        console.log(err)
      },
      {
        timeout: 30000
      }
    )

  },[])

  useEffect(()=>{
    setTechs(tags.join(', '))
  },[tags])

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs')

      setDevs(response.data.devs)
    }

    loadDevs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  async function handleAddDev(e) {
    e.preventDefault()

    const response = await api.post('/dev', {
      github_username,
      techs,
      latitude,
      longitude
    })

      setGithubUsername('')
      setTags([])

      setDevs([...devs, response.data])
  }

  function handleAddTags(tags) {
    setTags(tags)
  }

  return ( 
    <div id="app">
      <aside>
        <strong>Register</strong>
        <form onSubmit={handleAddDev}>

          <div className="input-block">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" value={ github_username } onChange={ e => setGithubUsername(e.target.value) } placeholder="Github Username" required/>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Techs</label>
            <TagsInput value={tags} onChange={handleAddTags} name="techs" id="techs"/>
          </div>

          <div className="input-group">
            
            <div className="input-block">
              <label htmlFor="long">Longitude</label>
              <input type="number" onChange={e => setLongitude(e.target.value) } name="long" id="long" value={longitude} placeholder="0.000000" readOnly/>
            </div>

            <div className="input-block">
              <label htmlFor="lat">Latitude</label>
              <input type="number" onChange={e => setLatitude(e.target.value) } name="lat" id="lat" value={latitude} placeholder="0.000000" readOnly/>
            </div>

          </div>
          <button type="submit">Save</button>
        </form>
      </aside>
      <main>
        <ul>
 
          {devs.map(dev => (

            <li className="dev-item">
              <header>
                <img src={dev.avatar_url} alt={dev.name}/>
                <div className="user-info">
                  <strong>{dev.name}</strong>
                  <span>{dev.techs.join(', ')}</span>
                </div>
              </header>
              <p>
              {dev.bio}
              </p>
            <a href={`https://github.com/${dev.github_username}`} target="_blank">View on Github</a>
            </li>
      
          ))}

        </ul>
      </main>
    </div>
  );
}

export default App