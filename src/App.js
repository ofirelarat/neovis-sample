import React, { useEffect } from 'react';
import NeoVis from 'neovis.js';

import './App.css';

function App() {
  useEffect(() => {
    var viz;
    
    var config = {
      container_id: "viz",
      server_url: "bolt://neo4j-tira-host.apps.ocp4.idf-cts.com:443",
      server_user: "neo4j",
      server_password: "tira",
      encrypted: "ENCRYPTION_ON",
      trust: "TRUST_ALL_CERTIFICATES",
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
      arrows: true,
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
