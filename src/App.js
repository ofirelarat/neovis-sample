import React, { useEffect } from 'react';
import NeoVis from 'neovis.js';

import './App.css';

function App() {
  useEffect(() => {
    var viz;
    
    var config = {
      container_id: "viz",
      server_url: "bolt://localhost:32768",
      server_user: "neo4j",
      encrypted: "ENCRYPTION_ON",
      trust: "TRUST_ALL_CERTIFICATES",
      server_password: "admin",
      labels: {
          "PERSON": {
              "caption": "NAME",
              "size": 1.0,
              "community": "community",
              "title_properties": [
                  "NAME",
              ]
          }
      },
      relationships: {
          "BROTHERS": {
              "thickness": "weight",
              "caption": true
          }
      },
      initial_cypher: "MATCH (n) RETURN n"
    };

    viz = new NeoVis(config);
    viz.render();

  },[]);

  return (
    <div className="App">
        <div id="viz"></div>
    </div>
  );
}

export default App;
