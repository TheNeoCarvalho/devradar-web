import React, {useState} from 'react'
import './global.css'
import './sidebar.css'
import './main.css'

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

function App() {

  const [tags, setTags] = useState([])

  function handleAddTags(tags) {
    setTags(tags)
  }

  return ( 
    <div className="App">
      <aside>
        <strong>Register</strong>
        <form>

          <div className="input-block">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" placeholder="Github Username" required/>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Techs</label>
            <TagsInput value={tags} onChange={handleAddTags} name="techs" id="techs"/>
          </div>

          <div className="input-group">
            
            <div class="input-block">
              <label htmlFor="long">Longitude</label>
              <input type="text" name="long" id="long" placeholder="0.000000"/>
            </div>

            <div class="input-block">
              <label htmlFor="lat">Latitude</label>
              <input type="text" name="lat" id="lat" placeholder="0.000000"/>
            </div>

          </div>
          <button type="submit">Save</button>
        </form>
      </aside>
      <main></main>
    </div>
  );
}

export default App